FROM tensorflow/magenta

RUN pip install flask

RUN mkdir -p /magenta-data/server

RUN mkdir -p /magenta-data/server/images/style_images

RUN mkdir -p /magenta-data/server/images/content_images

RUN mkdir -p /magenta-data/static/dist/output

COPY server/model /magenta-data/server/model

COPY server/server.py server/server.py

COPY static/dist /magenta-data/static/dist

WORKDIR /magenta-data/static

EXPOSE 5000

CMD ["python", "../server/server.py"]
