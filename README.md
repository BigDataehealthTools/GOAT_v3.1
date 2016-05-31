                                            # GOAT_Genetic_Output_Analysis_Tool
GOAT is an open source web based visualization tool that is connected directly to the researchers database (providing that he respects the database schema) and has a user friendly interface that will enable them to:
- Explore the information in their database at leisure freely;
- Store all GWAS results in a precise format avoiding preformatting prior to visualization;
- Filter, sort and select for the most relevant information before displaying a table of results that can be shared or visualized in a timely matter;
- Use interactive visualization tools for rapid identification of items of interests offering features like zooming, selection, 3D view, mouse over with identification labels. Resulting graphs are produced in a publication ready format for scientific publications or presentations;
- Produce graphs similar to LocusZoom and IGV but with improved features and performance creating a whole new visualization experience;
- Access relevant external databases through dynamic links to gather information on SNPs and genes such as GeneCards, dbSNP and the GWAS Catalog.

****************************************************Installation************************************************************

What you'll need:
- Apache server
- MySQL database (Schema is provided, you can visualize it through SQL designer)
- Python 2.7.11 or higher
- Django 1.9 or higher
- Anaconda for Biopython
- Upload annotation information from Ensembl in the marqueurs table of the database: 
    -http://useast.ensembl.org/biomart/martview/1b6c5a4447a4d09c26e2082dd71c86a6

Run MySQL and apache server, 

Then run these commands in this order:

1- python manage.py makemigrations

2- python manage.py migrate

3- python manage.py runserver (if local or)       python manage.py runserver 0.0.0.0 if you already have an address for your server

Datasets can't be provided because of intelletual property, but if you have Genome wide study datasets, they can fit in this database.
