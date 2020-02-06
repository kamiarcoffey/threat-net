FROM amazon/aws-eb-python:3.4.2-onbuild-3.5.1
COPY . /app
WORKDIR /app


EXPOSE 5000
RUN pip install -r requirements.txt
ENTRYPOINT ["python"]

CMD ["source/app.py"]