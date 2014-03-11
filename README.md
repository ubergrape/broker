# broker

small broker for events

[![Build Status](https://travis-ci.org/Swatinem/broker.png?branch=master)](https://travis-ci.org/Swatinem/broker)
[![Coverage Status](https://coveralls.io/repos/Swatinem/broker/badge.png?branch=master)](https://coveralls.io/r/Swatinem/broker)
[![Dependency Status](https://gemnasium.com/Swatinem/broker.png)](https://gemnasium.com/Swatinem/broker)

## Installation

    $ component install Swatinem/broker

## Usage

### broker(obj1, event, obj2, method)

Simply calls `method` on `obj2` when `event` on `obj1` is fired.

### broker.pass(obj1, event1, obj2, event2)

Passes `event1` from `obj1` on as `event2` on `obj2`.

## License

  LGPLv3

