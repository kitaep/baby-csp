FROM ubuntu:21.10

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Seoul
RUN apt-get update
RUN apt-get upgrade -y 
RUN apt-get install -y tzdata ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release xdg-utils nodejs npm wget

WORKDIR /tmp
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -q
RUN dpkg -i ./google-chrome-stable_current_amd64.deb
RUN rm ./google-chrome-stable_current_amd64.deb

WORKDIR /app
COPY . /app/
RUN PUPPETEER_SKIP_DOWNLOAD=1 npm install
RUN chmod +x /app/index.js
RUN chmod +x /app/bot.sh
RUN useradd -m www
USER www
ENTRYPOINT [ "/app/bot.sh" ]