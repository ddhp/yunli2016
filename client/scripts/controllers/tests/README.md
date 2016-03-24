# client/scripts/controllers/tests/
All **controllers** test case files would be put here.  
We use [casper.js](http://docs.casperjs.org/en/latest/quickstart.html) to test our controllers.  
It is **intergration test** b/c controller - which is client side, is related to views - which rendered on server side,  
so we have to actually visiting actual url and run our test.

It's kind of like doing scrape.

See any test script to know detail.

For files under /common, they are not testable, b/c they are required in parent controller,
so we test them inside related controllers.
