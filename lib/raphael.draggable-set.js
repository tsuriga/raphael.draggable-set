/*
The MIT License (MIT)

Copyright (c) 2015 Tsuri Kamppuri

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/**
 * Creates and returns a draggable set
 *
 * Creates a linked group of elements that are all dragged when any handle
 * element is dragged. The supplied dragging start and end animations are
 * applied to the animation set. Elements can be brought to front when dragging
 * starts. Works with rectangles, circles, ellipses and text elements.
 *
 * @param Array group Grouped elements
 * @param Array handles [OPTIONAL] Elements that can be used to move the group.
 *                                 Defaults to whole group
 * @param bool isBound [OPTIONAL] If elements are to be bound within the
 *                                drawing canvas. Defaults to false
 * @param bool moveToTop [OPTIONAL] If grouped elements should be moved to top.
 *                                  Defaults to false
 * @param Array animationGroup [OPTIONAL] Elements to animate. Defaults to
 *                                        whole group
 * @param Raphael.Animation startAnimation [OPTIONAL] Animation to play at the
 *                                                    beginning of dragging.
 *                                                    Defaults to none
 * @param Raphael.Animation endAnimation [OPTIONAL] Animation to play at the
 *                                                  end of dragging. Defaults
 *                                                  to none
 * @return Raphael.Set
 *
 * @version 1.0
 */
Raphael.fn.draggableSet = function (
    group,
    handles,
    isBound,
    moveToTop,
    animationGroup,
    startAnimation,
    endAnimation
) {
    if (!handles) {
        handles = group;
    }

    if (!animationGroup) {
        animationGroup = group;
    }

    var groupSet = this.set(group),
        handleSet = this.set(handles),
        animationSet = this.set(animationGroup),
        oX = [],
        oY = [];

    handleSet.drag(function (dX, dY, x, y, dE) {
        var boundaryViolation = false;

        // Don't move the group if any the group's
        // elements would break out of the canvas
        if (isBound) {
            groupSet.forEach(function (e) {
                var nX = oX[e.id] + dX,
                    nY = oY[e.id] + dY,
                    eW,
                    eH;

                switch (e.type) {
                case 'rect':
                    eW = e.attr('width');
                    eH = e.attr('height');

                    break;
                case 'circle':
                    nX -= e.attr('r');
                    nY -= e.attr('r');
                    eW = 2 * e.attr('r');
                    eH = 2 * e.attr('r');

                    break;
                case 'ellipse':
                    nX -= e.attr('rx');
                    nY -= e.attr('ry');
                    eW = 2 * e.attr('rx');
                    eH = 2 * e.attr('ry');

                    break;
                case 'text':
                    var bBox = e.getBBox(true);

                    if (e.attr('text-anchor') === 'middle') {
                        nX -= Math.floor(bBox.width / 2);
                    } else if (e.attr('text-anchor') === 'end') {
                        nX -= bBox.width;
                    }

                    nY -= Math.floor(bBox.height / 2);

                    eW = bBox.width;
                    eH = bBox.height;

                    break;
                default:
                    return false;
                }

                if (nX < 0 || nX + eW > e.paper.width ||
                    nY < 0 || nY + eH > e.paper.height
                ) {
                    boundaryViolation = true;

                    return false;
                }
            });
        }

        if (!boundaryViolation) {
            groupSet.forEach(function (e) {
                var nX = oX[e.id] + dX,
                    nY = oY[e.id] + dY;

                e.attr(e.type === 'circle' || e.type === 'ellipse' ?
                    { cx: nX, cy: nY } :
                    { x: nX, y: nY }
                );
            });

        }

        eve('raphael.drag.move.' + groupSet.id, this, dX, dY, x, y, dE);
    }, function (x, y, dE) {
        groupSet.forEach(function (e) {
            oX[e.id] = e.type === 'circle' || e.type === 'ellipse' ?
                e.attr('cx') : e.attr('x');
            oY[e.id] = e.type === 'circle' || e.type === 'ellipse' ?
                e.attr('cy') : e.attr('y');

            if (moveToTop) {
                e.toFront();
            }
        });

        if (startAnimation) {
            animationSet.animate(startAnimation);
        }

        eve('raphael.drag.start.' + groupSet.id, this, x, y, dE);
    }, function (dE) {
        if (endAnimation) {
            animationSet.animate(endAnimation);
        }

        eve('raphael.drag.end.' + groupSet.id, this, dE);
    });

    return groupSet;
}
