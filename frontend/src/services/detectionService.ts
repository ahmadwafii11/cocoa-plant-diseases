import { API_BASE_URL } from "./api";
import type { DetectionResult, DetectionHistory } from "../types/detection";

export async function detectDisease(imageFile: File): Promise<DetectionResult> {
    const token = localStorage.getItem("cocoascan_token");

    if (!token) {
        throw new Error("Token autentikasi tidak ditemukan.");
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(`${API_BASE_URL}/detection`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
            errorText || "Gagal melakukan deteksi penyakit."
        );
    }

    const data: DetectionResult = await response.json();

    return data;
}

export async function getDetectionHistory(): Promise<DetectionHistory[]> {
    const token = localStorage.getItem("cocoascan_token");

    if (!token) {
        throw new Error("Token autentikasi tidak ditemukan.");
    }

    const response = await fetch(
        `${API_BASE_URL}/detection-history`, 
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok){
        const errorText = await response.text();
        throw new Error(errorText || "Gagal mengambil riwayat deteksi.");
    }

    const data: DetectionHistory[] = await response.json();

    return data;
}

export async function getDetectionDetail(detectionId: number): Promise<DetectionHistory> {
    const token = localStorage.getItem("cocoascan_token");

    if (!token) {
        throw new Error("Token autentikasi tidak ditemukan.");
    }

    const response = await fetch(
        `${API_BASE_URL}/detection-history/detail/${detectionId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("Data deteksi tidak ditemukan atau tidak dapat diakses.");
        }
        
        const errorText = await response.text();
        throw new Error(errorText || "Gagal mengambil detail deteksi.");
    }

    const data: DetectionHistory = await response.json();
 
    return data;
}