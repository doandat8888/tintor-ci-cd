FROM python:3.9-slim-buster

WORKDIR /app

COPY requirements.txt .
# RUN pip freeze > requirements.txt 
RUN pip install --no-cache-dir -r requirements.txt
# RUN echo requirements.txt
# RUN pip install flask
# RUN pip install flask_cors


COPY . .

EXPOSE 8888

CMD ["python", "test.py"]