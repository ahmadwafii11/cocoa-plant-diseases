use axum::{
    routing::{get, post, put},
    Router,
    extract::DefaultBodyLimit,
};
use dotenvy::dotenv;
use std::env;
use tower_http::{
    cors::{Any, CorsLayer},
    services::ServeDir,
};

mod db;
mod handlers;
mod core;
mod middleware;
mod models;
mod services;
mod repositories;
mod routes;

#[tokio::main]
async fn main() {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL tidak ditemukan");

    let pool = db::create_pool(&database_url).await;

    println!("Berhasil terhubung ke PostgreSQL!");

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let protected_routes = Router::new()
        .route(
            "/api/users/me",
            get(handlers::user::get_user_me)
                .put(handlers::user::update_user_me),
        )
        .route(
            "/api/users/me/profile-image",
            put(handlers::user::upload_profile_image)
                .layer(DefaultBodyLimit::max(7 * 1024 * 1024)),
        )
        .route(
            "/api/users/me/password",
            put(handlers::user::change_password),
        )
        .route(
            "/api/detection",
            post(routes::detection::detect)
                .layer(DefaultBodyLimit::max(12 * 1024 * 1024)),
        )
        .route(
            "/api/detection-history",
            get(handlers::detection::get_detection_history),
        )
        .route(
            "/api/detection-history/detail/{id}",
            get(handlers::detection::get_detection_detail),
        )
        .layer(axum::middleware::from_fn(
            middleware::auth::auth_middleware,
        ));

    let app = Router::new()
        .route("/", get(|| async {
            "CocoaScan API is running!"
        }))
        .route(
            "/api/auth/register",
            post(handlers::auth::register),
        )
        .route(
            "/api/auth/login",
            post(handlers::auth::login),
        )
        .merge(protected_routes)
        .nest_service(
            "/uploads/profile",
            ServeDir::new("uploads/profile"),
        )
        .layer(cors)
        .with_state(pool);
    
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .expect("Gagal menjalankan server");

    println!("CocoaScan API running on http://127.0.0.1:3000");

    axum::serve(listener, app)
        .await
        .expect("Server error");
}