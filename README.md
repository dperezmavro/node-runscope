# Introduction

This is an early-stage library for using the Runscope v1 API with node. This is a promise-based library, because I like promises.

# Usage

I tried to take some lessons about the structure of a large client from how the AWS SDK for node is structured. The currently supported endpoints are listed in `clients/all.js`, and a sample usage would be:

```javascript

var runscope = require('runscope').Environment;

var env = new Environment(api-key, bucket-key);
env.foo();

```
