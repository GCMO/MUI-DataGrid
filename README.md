USER ADMIN with MUI <DATAGRID>
==========

# INSTALLATION

- Install Node.js with npm (unless already installed)
- `npm install` to install dependencies for the client and the server
- Follow the instructions in the README in `server` to get started with the backend
- Follow the instructions in the README in `client` to get started with the frontend

# Introduction

This is a simple CRUD application Excell styled for managing users. Developed with MUI <DataGrid> and basic MongoDB/Node/Express BackEnd (the server dir).

# Features:

- Users details (Name, email, ID, DateTime) are dircetly fetched from free  https://fakerapi.it/api/v1
- the Search Bar, will minimize rows to the searched text.
- All 300 fetched users are displaye in the DataGrid, with a pagination option of either: 25, 50, 100 rows per page.
- Pressing the Delete Icon button will remove users both from the DataGrid and the DB. 
- Pressing the Add User button should give you the option of adding new users... but... still working on it. 
Getting an error: ID not recognized. Feel free to look at, download it or PR it and share ideas to fix it. 
