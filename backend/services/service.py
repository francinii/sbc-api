

class Service():
    def __init__(self):
        pass


    def call_model(self, items: float, items2: float):
        #model = joblib.load('model.pkl')
        #return model.predict(X_test)
        return "Hola mundo {} {} ".format(items, items2)