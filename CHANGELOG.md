# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-09-19
### Added
- Added new APIs for Inventory operations like add, edit and delete.
- Added new APIs for adding new bills, retrive all bills and getting bill by Id.
- Added new middleware for changing request and response object keys
- Added new errorhandler middleware

### Fixed
- Issue when array of object type field name is not changing to kabob case and camel case issue fixed.
- Added success message to roles and users APIs.
- Stablized roles and users API response and requests.

### Removed
- Removed swagger implementation.
**Note:** Versions jumped between 0.0.3 and 0.0.9 in favour of multiple New feature addition in the application.

## [0.0.2] - 2024-09-06
### Added
- Added new API for registering user with email
- New registered user considered as Admin of the business

### Fixed
- API issues fixed on users CRUD operations
- API issues fixed on roles CRUD operstions

## [0.0.1] - 2024-09-03
### Added
- Initial release of the Biller Application back office.
- User authentication with JWT support.
- Role-based access control (RBAC) implemented.
- Added crud operations for roles.
- Added crud operations for users.
- Login and logout oprestions added.
- Password hasihing functionality added.
- Connected with SQL database.