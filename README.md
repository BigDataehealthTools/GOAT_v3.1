# What you need #

1. Have Python 2.7.8 (or higher) installed
2. Have [Pip installed](https://pip.pypa.io/en/stable/installing/)
3. Have [Virtualenv installed](https://packaging.python.org/key_projects/#virtualenv)

# How to set up #

1. Clone repository
2. Move into the goat_v3 folder
3. Create a virtual environnement using Virtualenv
4. Install needed libraries using this command :

    pip install -r /path/to/requirements.txt

5. Set a MySQL database and load .sql files. (ask beatriz.kanzki@gmail.com)
6. Connect projet to database (in the settings.py file)
7. Migrate database (not really necessary since we loaded the sql files, but...)
    
    python manage.py migrate

8. Create a new superuser using this command :
    
    python manage.py createsuperuser

9. You should be good to go!