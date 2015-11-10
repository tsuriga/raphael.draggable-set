# Raphael.draggable-set

raphael.draggable-set is an extension for [Raphaël JS](http://raphaeljs.com/) v2. It adds a function to Raphael namespace for creating a draggable set from arrays of Raphaël elements (rectangles, circles, ellipses, and texts).

### Features ###

* Animations at the beginning and at end of dragging
* Group elements, drag handling elements and animated elements can all be separate collections
* Events: dragging will fire _`raphael.drag.start.<id>`_, _`raphael.drag.move.<id>`_ and _`raphael.drag.end.<id>`_ events with set ids

Tested and developed on Raphaël v2.1.2.

If you need dragging functions for Raphaël v1 check out [mephraim/raphael.draggable](https://github.com/mephraim/raphael.draggable).


## USAGE ##

```javascript
// Assuming canvas = Raphael(...)

var box = canvas.rect(25, 25, 25, 25),
    circle = canvas.circle(38, 50, 8).attr({ fill: 'orange', cursor: 'move' }),
    text = canvas.text(50, 150, 'Dragging active').attr({ opacity: 0 }),

    groupedElements = [box, circle],
    handleElements = [circle],
    animatedElements = [text],
    isBound = true,
    moveToTop = true,
    animationElements = [text],
    startAnimation = Raphael.animation({ opacity: 1 }, 100),
    endAnimation = Raphael.animation({ opacity: 0 }, 100),

    draggableSet = canvas.draggableSet(
        groupedElements,
        handleElements, // OPTIONAL
        isBound, // OPTIONAL
        moveToTop, // OPTIONAL
        animatedElements, // OPTIONAL
        startAnimation, // OPTIONAL
        endAnimation // OPTIONAL
    );

```

See function documentation and demo code for arguments and more versatile examples.


## DEMO ##

Demo included, live version available on [the github pages page]().


## CHANGELOG ##

* v1.0.0 (2015-11-10): first version


## DEVELOPMENT IDEAS ##

* Implement _`raphael.drag.over.<id>`_ for sets. The detection is based on cursor position rather than element boundaries so I don't really know if there is a whole lot of desire for this. If you need this, let me know or feel free to send forth a pull request.


## AUTHORS ##

* Tsuri Kamppuri
