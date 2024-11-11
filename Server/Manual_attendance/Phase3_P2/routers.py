# Manual_attendance/Phase3_P2/routers.py

class Phase3P2DatabaseRouter:
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'Phase3_P2':
            return 'phase3_p2'  # Route reads for Phase3_P2 to 'phase3_p2' database
        return 'default'  # Otherwise, use the default database

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'Phase3_P2':
            return 'phase3_p2'  # Route writes for Phase3_P2 to 'phase3_p2' database
        return 'default'  # Otherwise, use the default database

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label == 'Phase3_P2':
            return db == 'phase3_p2'  # Ensure migrations for Phase3_P2 go to 'phase3_p2'
        return db == 'default'  # Other apps should migrate to the default database
