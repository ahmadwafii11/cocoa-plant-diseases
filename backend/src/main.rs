use axum::{
    routing::{get, post,},
    Router,
};
use dotenvy::dotenv;
use std::env;
use tower_http::{
    cors::{Any, CorsLayer},
};

mod db;
mod handlers;

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