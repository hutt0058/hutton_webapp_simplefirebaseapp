angular
  .module('app', ['firebase'])
  .constant('firebaseConfig', {
    apiKey: "AIzaSyCyah3iCRj_Stynt6mgZK2Ka1H0tA1Azj8",
    authDomain: "smallfirebaseapp-73079.firebaseapp.com",
    databaseURL: "https://smallfirebaseapp-73079.firebaseio.com",
    storageBucket: "smallfirebaseapp-73079.appspot.com",
    messagingSenderId: "848312152519",
  })
  .run(firebaseConfig => firebase.initializeApp(firebaseConfig))
  .service('dbRefRoot', DbRefRoot)
  .service('customers', Customers)
  .controller('CustomerCtrl', CustomerCtrl)

function DbRefRoot() {
  return firebase.database().ref()
}

function Customers(dbRefRoot, $firebaseObject, $firebaseArray) {
  const dbRefCustomers = dbRefRoot.child('customers')

  this.get = function get(id) {
    return $firebaseObject(dbRefCustomers.child(id))
  }

  this.getAll = function getAll() {
    return $firebaseArray(dbRefCustomers)
  }

}

function CustomerCtrl(customers) {

  this.getNewCustomer = function getNewCustomer() {
    return {
      firstName: '',
      lastName: '',
      location: '',
      isVip: false,
      balance: 0
    }
  }

  this.newCustomer = this.getNewCustomer()

  this.customer = customers.get('1234567890ABCDEF1234567890ABCDE3')

  this.customers = customers.getAll()

  this.remove = function remove(customer) {
    if (confirm("Are your sure you want to delete this customer?")) {
      this.customers.$remove(customer)
    }
  }

  this.save = function save(customer) {
    this.customers.$save(customer)
  }

  this.addCustomer = function addCustomer(newCustomer) {
    console.log('Called addCustomer')
    this.customers
      .$add(newCustomer)
      .then( newRef => {
        console.log('new customer id = ' + newRef.key)
        this.newCustomer = this.getNewCustomer()
      })
    console.log('addCustomer function complete')
  }
}
