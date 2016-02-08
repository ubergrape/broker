# broker

small broker for events

[![Build Status](https://travis-ci.org/Swatinem/broker.png?branch=master)](https://travis-ci.org/Swatinem/broker)
[![Coverage Status](https://coveralls.io/repos/Swatinem/broker/badge.png?branch=master)](https://coveralls.io/r/Swatinem/broker)
[![Dependency Status](https://gemnasium.com/Swatinem/broker.png)](https://gemnasium.com/Swatinem/broker)

## Installation

    $ component install ubergrape/broker

## Usage

### broker(emitters, event, receivers, method)

Simply calls `method` on `receivers` when `event` on `emitters` is fired.
Both `emitters` and `receivers` can be arrays.

### broker.pass(emitter, onevent, receiver, [emitevent])

Passes `onevent` from `emitter` on as `emitevent` on `receiver`.
When no `emitevent` is given, it defaults to the same as `onevent`.
Both `emitters` and `receivers` can be arrays.

## License

  LGPLv3

  Released as free software as part of [ChatGrape](https://chatgrape.com/)

