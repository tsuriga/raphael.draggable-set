window.addEventListener(
    'load',
    function () {
        function initDemo1() {
            var canvas = Raphael('demo1', 400, 300),

                box1 = canvas
                    .rect(50, 50, 100, 100)
                    .attr({ fill: 'lightpink', stroke: 'darkred' }),
                handle1 = canvas
                    .ellipse(100, 50, 20, 10)
                    .attr({ fill: 'white', stroke: 'black', cursor: 'move' }),
                text1 = canvas.text(100, 170, 'Lorem Ipsum Dolor Sit Amet\nAenean a est consequat'),

                box2 = canvas
                    .rect(325, 100, 100, 100)
                    .attr({ fill: 'lightsteelblue', stroke: 'midnightblue', cursor: 'move' }),
                handle2 = canvas
                    .ellipse(375, 200, 20, 10)
                    .attr({ fill: 'white', stroke: 'black', cursor: 'move' }),
                text2 = canvas
                    .text(375, 90, 'The Quick Fox')
                    .attr({ cursor:'move' });

                group1 = [box1, handle1, text1],
                group2 = [box2, handle2, text2],
                handles1 = [handle1],
                handles2 = [handle2],

                draggableSet1 = canvas.draggableSet(group1, handles1),
                draggableSet2 = canvas.draggableSet(group2);
        }

        function initDemo2() {
            var canvas = Raphael('demo2', 400, 300),

                attrGroup1 = { fill: 'lightpink', stroke: 'darkred' },
                circle1 = canvas.circle(100, 100, 50).attr(attrGroup1),
                box1 = canvas.rect(87, 20, 25, 25).attr(attrGroup1).attr({ cursor: 'move' }),
                box2 = canvas.rect(155, 87, 25, 25).attr(attrGroup1).attr({ cursor: 'move' }),
                box3 = canvas.rect(20, 87, 25, 25).attr(attrGroup1).attr({ cursor: 'move' }),
                text1 = canvas.text(85, 180, 'THIS\nHAS\nFOUR\nLINES').attr({ 'text-anchor': 'start' }),

                attrGroup2 = { fill: 'lightsteelblue', stroke: 'midnightblue' },
                circle2 = canvas.circle(180, 115, 50).attr(attrGroup2),
                box4 = canvas.rect(167, 35, 25, 25).attr(attrGroup2).attr({ cursor: 'move' }),
                text2 = canvas.text(305, 180, 'SINGLE LONG LINE RIGHT ALIGN').attr({ 'text-anchor': 'end' }),

                indicator1 = canvas.circle(35, 265, 25).attr({ fill: 'white', stroke: 'black' }),
                indicator2 = canvas.circle(365, 265, 25).attr({ fill: 'white', stroke: 'black' }),

                group1 = [circle1, box1, box2, box3, text1],
                handles1 = [box1, box2, box3],
                group2 = [circle2, box4, text2],
                handles2 = [box4],

                animStart = Raphael.animation({ fill: 'black' }, 500),
                animEnd = Raphael.animation({ fill: 'white' }, 500);

                draggableSet1 = canvas.draggableSet(group1, handles1, true, true, [indicator1], animStart, animEnd),
                draggableSet2 = canvas.draggableSet(group2, handles2, true, true, [indicator2], animStart, animEnd);
        }

        function initDemo3() {
            var lastPosDiv = document.getElementById('lastPos'),
                collisionCounter = document.getElementById('collisionCounter'),
                collisionCount = 0,

                canvas = Raphael('demo3', 400, 300),

                staticBox = canvas
                    .rect(100, 130, 200, 50)
                    .attr({ fill: 'lightsteelblue', stroke: 'black', 'stroke-width': 3 }),

                box = canvas
                    .rect(25, 25, 125, 35)
                    .attr({ fill: 'white', stroke: 'black', 'stroke-width': 2, cursor: 'move' }),
                draggableSet = canvas.draggableSet([box]);

            eve.on('raphael.drag.move.' + draggableSet.id, function (dX, dY, x, y, e) {
                lastPosDiv.textContent = '(' + x + ', ' + y + ')';
            });

            // We have to attach this one to the box, the draggable set does not support over events yet
            eve.on('raphael.drag.over.' + box.id, function () {
                collisionCounter.textContent = ++collisionCount;
            });
        }

        initDemo1();
        initDemo2();
        initDemo3();
    },
    false
);
