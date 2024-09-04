# Billing Back Office

## Description

Billing Back Office is a Node.js and Express based service for Billing UI App. For database this app uses SQL.

## Table of Contents

- [Installation](#installation)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Thiya11/billingBackOffice.git
   cd projectName
2. Initial set up of the project:
   ```bash
   npm install
3. Create RSA256 keys to get start with JWT authentication
   ```bash
   ssh-keygen -t rsa -b 4096 -m PEM -f /keys/rsa.key
   Enter passphrase (empty for no passphrase): [Press Enter] //do not set passphrase
   Enter same passphrase again: [Press Enter] //do not set passphrase
   openssl rsa -in /keys/rsa.key -pubout -outform PEM -out /keys/rsa.key.pub
   ```
   It will create rsa keys inside keys folder

4. Now create ###.env file and add the following fields
   - DB_HOST=localhost
   - DB_PORT=3306
   - DB_USER_NAME=
   - DB_USER_PASSWORD=
   - DB_NAME=
   - PASSWORD_SALT=
   - SESSION_SECRET=
   - Include your password and secret values respectively.

5. Now start running your node app first time
   ```bash
   npm start
   ```
