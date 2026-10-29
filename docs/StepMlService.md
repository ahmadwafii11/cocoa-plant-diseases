1. python3 -m venv .venv
2. source .venv/Scripts/activate (windows)
2. source .venv/bin/activate (linux)
3. pip install fastapi uvicorn
4. mkdir app
5. mkdir app/routes
6. mkdir app/services
7. mkdir app/schemas
8. mkdir models
9. mkdir uploads
10. mkdir results
11. touch app/__init__.py
12. touch app/main.py 
13. touch app/routes/prediction.py
14. touch app/services/prediction.py
15. touch app/services/gradcam.py
16. touch app/schemas/prediction.py
17. touch requirements.txt
18. uvicorn app.main:app --reload --port 8000 (menjalankan FastAPI)
19. pip install numpy
20. python -m pip install --upgrade pip
21. pip install Pillow
22. python -c "import tensorflow as tf; import keras; print('TensorFlow:', tf.__version__); print('Keras:', keras.__version__)" (cek version tensorflow dan keras)
23 touch test_model.py 
24. pip install tensorflow==2.20.0 keras==3.13.2 (versi yang sesuai saat training model di kaggle)
25. pip install opencv-python