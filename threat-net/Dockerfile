FROM python:3.7.2-stretch
ADD . /app
WORKDIR /app
RUN pip install -r requirements.txt
ENTRYPOINT ["python"]
CMD ["run.py"]
# CMD ["uwsgi", "app.ini"]
