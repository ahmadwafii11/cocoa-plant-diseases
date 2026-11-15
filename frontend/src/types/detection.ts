export interface DetectionResult{
    id                  : number;
    class_name          : string;
    confidence          : number;
    probabilities       : Record<string, number>;
    image_url           : string;
    gradcam_url         : string;
    original_filename   : string;
    model_version       : string;
}

export interface DetectionHistory {
    id                  : number;
    user_id             : number;
    diseases_id         : number;
    diseases_name       : string;
    image_path          : string;
    gradcam_path        : string;
    class_name          : string | null;
    confidence          : number;
    probabilities       : Record<string, number> | null;
    original_filename   : string | null;
    model_version       : string | null;
    detected_at         : string;
}