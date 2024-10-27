class Phase3P1DatabaseRouter:
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'Phase3_P1':
            return 'phase3_p1'
        return 'default'

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'Phase3_P1':
            return 'phase3_p1'
        return 'default'

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label == 'Phase3_P1':
            return db == 'phase3_p1'
        return db == 'default'
