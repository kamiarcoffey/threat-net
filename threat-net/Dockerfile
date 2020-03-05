
# For Local Docker configuration
FROM python:3.7.2-stretch

# For AWS Docker configuration
# FROM amazon/aws-eb-python:3.4.2-onbuild-3.5.1
# EXPOSE 5000

# end AWS Docker config


ADD . /app
WORKDIR /app

RUN pip install -r requirements.txt
ENTRYPOINT ["python"]
CMD ["run.py"]
# CMD ["uwsgi", "app.ini"]
