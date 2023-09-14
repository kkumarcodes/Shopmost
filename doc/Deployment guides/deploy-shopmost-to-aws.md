---
sidebar_position: 5
keywords:
- Deploy Shopmost to AWS
sidebar_label: Deploy Shopmost to AWS
title: Deploy Shopmost to AWS
description: This document describes step by step how to deploy Shopmost to AWS using AWS EC2 and AWS RDS.
---

# Deploy Shopmost to AWS

This document describes step by step how to deploy Shopmost to AWS using AWS EC2 and AWS RDS.
Before you start, make sure you have an AWS account. In this document, we will use the free tier.

## EC2 instance preparation

### Create an EC2 instance

We assume you have an AWS account and you are logged in to the AWS console. From here you can create an EC2 instance. This instance will be used to run the Shopmost application.

:::info
If you are new to AWS, you can follow this [tutorial](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html) to create an EC2 instance.
:::

For Shopmost, we recommend using an Ubuntu 20.04 LTS instance. You can choose the instance type based on your needs. In this tutorial we will use a t2.micro instance.

### Install NodeJS and Npm

After you have your instance, connect to it using SSH and install node.js and npm.

```bash
sudo apt update
sudo apt install nodejs npm
```

Shopmost requires node.js version 14 or higher. Npm version 8 or higher is also required.

### Install PM2

[PM2](https://pm2.keymetrics.io/) is a process manager for Node.js applications. It allows you to keep your application running in the background, even if your server restarts. Here's how to install PM2 on Ubuntu server:
Install PM2 using npm (the Node.js package manager):

```bash
sudo npm install -g pm2
```

Verify the installation by checking the PM2 version:

```bash
pm2 -v
```

### Install Nginx

[Nginx](https://www.nginx.com/) is a popular web server that can be used to serve static files, reverse proxy requests to Node.js applications, and more. Here's how to install Nginx on Ubuntu server:

```bash
sudo apt update
sudo apt install nginx
```

### Configure Nginx

Nginx is configured using a configuration file. The default configuration file is located at `/etc/nginx/nginx.conf`. You can edit this file to change the default configuration.

In this tutorial, we will use a simple configuration file to serve the Shopmost application. This configuration file will be located at `/etc/nginx/sites-available/shopmost.conf`.

```bash
server {
    listen 80;
    server_name shopmost.example.com www.shopmost.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

By default, Aws will provide you with a default domain name. You can use this domain name to access your Shopmost application. If you want to use a custom domain name, you need to configure it in the AWS console.

Remember to replace `shopmost.example.com` with your domain name.

After you have created the configuration file, you need to enable it. You can do this by creating a symbolic link from the configuration file to the `/etc/nginx/sites-enabled` directory.

```bash
sudo ln -s /etc/nginx/sites-available/shopmost.conf /etc/nginx/sites-enabled/
```

Disable the default configuration file.

```bash
sudo unlink /etc/nginx/sites-enabled/default
```

After you have enabled the configuration file, you need to restart Nginx.

```bash
sudo systemctl restart nginx
```
  
## Database preparation

### Create an RDS instance

We will use AWS RDS to create a PostgreSQL database. This database will be used by the Shopmost application.

:::info
If you are new to AWS, you can follow this [tutorial](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_CreateDBInstance.html) to create an RDS instance.
:::

Shopmost requires PostgreSQL version 13 or higher. In this tutorial we will use a PostgreSQL 13 instance.

### Configure the security group

The security group is a set of firewall rules that control the traffic to your database. You need to add a rule to allow traffic from your EC2 instance to your RDS instance.

:::info
If you are new to AWS, you can follow this [tutorial](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.WorkingWithRDSInstanceinaVPC.html) to configure the security group.
:::

### Create a database for Shopmost

After you have your RDS instance, connect to it using a PostgreSQL client. We will use [pgAdmin](https://www.pgadmin.org/) in this tutorial.

### Create a database user

Create a **supper** database user for Shopmost. We will use the username `shopmost` and the password `shopmost` in this tutorial.

### Migrate from local installation

At this step you need to export the database from your local machine and import it to your RDS instance. You can use any tool you prefer to export and import the database.

After you have imported the database to your RDS instance, create a `config/default.json` file with your configuration. You can copy the `config/default.json` file from your local machine to your EC2 instance and replace the database connection details with the ones from your RDS instance.

## Source code deployment

### Fork the Shopmost project template

First, you need to fork the Shopmost repository. You can do this by clicking the **Fork** button on the [Shopmost project template](https://github.com/kkumarcodes/Shopmost/fork). This repository contains the template for the Shopmost application.

:::info
If you have a theme, extension. You need to add it to your forked repository.
:::

### Deploy the source code to your EC2 instance

This step, you have many options. You can deploy the source code using git, GitHub Actions, or any other method you prefer. In this tutorial, we will use a simple bash script to deploy the source code to our EC2 instance. This script will download the source code from your forked repository and run the Shopmost application.

```bash
#!/bin/bash

# Github token
TOKEN="<Your github persional token>"

# Github repo details
REPO_OWNER="<your github account>"
REPO_NAME="<your repo>"
BRANCH="main"

# Check if tar is installed, and install if not
echo "Checking if tar is installed..."
if ! command -v tar &> /dev/null
then
    echo "tar is not installed, installing now..."
    sudo apt-get install tar -y
fi

# Set variables
CURRENT_BUILD="current"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
NEW_BUILD="build_$TIMESTAMP"

# Download source from GitHub archive
echo "Downloading source from GitHub..."
wget --header="Authorization: token $TOKEN" -O $NEW_BUILD.tar.gz https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/tarball


# Unzip source to new build directory
echo "Extracting source to $NEW_BUILD..."
mkdir $NEW_BUILD
tar -xf $NEW_BUILD.tar.gz -C $NEW_BUILD --strip-components 1

# Install npm dependencies
echo "Installing npm dependencies..."
cd $NEW_BUILD && npm install --unsafe-perm

# Build the app
echo "Building the app..."
npm run build

cd ..

# Rename current build folder to previous build folder
if [ -d "previous-build" ]; then
  rm -rf previous-build
fi

echo "Rename the current build to previous-build"
mv $CURRENT_BUILD previous-build

# Rename new build folder to current build folder
mv $NEW_BUILD $CURRENT_BUILD

# Copy media and config folder from previous build to current build
if [ -d "previous-build" ]; then
  cp -R previous-build/media $CURRENT_BUILD/media
  cp -R previous-build/config $CURRENT_BUILD/config
fi

# Set permissions for media folder
chmod 777 $CURRENT_BUILD/media

cd $CURRENT_BUILD

# Start app with pm2 using the configuration file
pm2 stop all
pm2 start app.json
```
This script will do the following:
- Download the source code from your forked repository.
- Install the npm dependencies.
- Build the app.
- Stop the Shopmost application.
- Rename the current build to `previous-build`.
- Rename the new build to `current`.
- Copy the media and config from the previous build to the current build.
- Start the Shopmost application using PM2.

You can create a file named `deploy.sh` with the above script and save it to `/var/www/html`.

:::warning
You need to replace the following variables with your own values:
- `TOKEN`: You can generate the persional token from your github account.
- `REPO_OWNER`
- `REPO_NAME`
:::

## Run the deployment

SSH to your EC2 instance, navigate to `/var/www/html`. If this is the first time you run the deployment, you need to create a folder named `current` and inside this folder create a folder named `config`. Then create a file named `default.json` inside the `config` folder. This file will contain your configuration. You can copy the `config/default.json` file from your local machine to your EC2 instance and replace the database connection details with the ones from your RDS instance.

After you have created the `default.json` file, you can run the deployment script.

```bash
bash deploy.sh
```
Once the deployment is done, your store is up and running.

Now you can access your Shopmost application using your domain name. The admin panel is available at `https://yourdomain.com/admin`.

## Conclusion

In this tutorial, we have learned how to install Shopmost on an AWS EC2 instance. We have also learned how to configure Nginx to serve the Shopmost application. This tutorial is a good starting point for anyone who wants to install Shopmost on a production server. This tutorial uses AWS EC2 and RDS, but you can use any other server provider you prefer.

## Bonus

### Install Let's Encrypt

[Let's Encrypt](https://letsencrypt.org/) is a free, automated, and open certificate authority. It provides free SSL certificates that you can use to secure your Shopmost application.

To install Let's Encrypt, follow the instructions in this [tutorial](https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal). This tutorial will guide you through the process of installing Let's Encrypt and configuring Nginx to use the SSL certificates.