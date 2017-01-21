FROM risingstack/alpine:3.4-v7.4.0-4.2.0

WORKDIR /opt/app

# Install yarn from the local .tgz.
RUN mkdir -p /opt
ADD latest.tar.gz /opt/
RUN mv /opt/dist /opt/yarn
ENV PATH "$PATH:/opt/yarn/bin"

# Install packages using Yarn.
ADD package.json /tmp/package.json
RUN cd /tmp && yarn
RUN mkdir -p /opt/app && cd /opt/app && ln -s /tmp/node_modules

# Bundle app source.
COPY . /opt/app

# Start the app.
EXPOSE 8080
CMD [ "npm", "start" ]