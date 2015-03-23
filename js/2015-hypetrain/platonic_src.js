function R ()
{
	with (Math) {
		// eye is [3, 3, 3]
		var w = a.width,
		h = a.height,
		size = [w, h],
		eyeDistance = sqrt (27),
		eyeDirection = 3 / eyeDistance,
		dirWithAspect = eyeDirection * 2 / w * h,
		matrix = [ // projection matrix * model view matrix
			-dirWithAspect, -2 / 3, eyeDirection, -eyeDirection,
			dirWithAspect, -2 / 3, eyeDirection, -eyeDirection,
			0, 4 / 3, eyeDirection, -eyeDirection,
			0, 0, -eyeDistance, eyeDistance
		],
		val = .5 + sqrt (5) / 2,
		vertexTable = [0, 1, -1, val, -val, 1 / val, -1 / val], // vertex coordinate values
		vertices = '111221212122300400030040003004013014023024130140230240301302401402112121211222053054063064530540630640305405306406', // indices to vertexTable
		shapes = [ // indices to vertices
			'013021032123', // tetrahedron
			'468479487496569578586597', // octahedron
			':<B:>@:@D:B>:D<;=E;>C;@>;C=;E@<?B<A?<DA=?A=AE=C?>BC@ED?CBADE', // icosahedron
			'0F2H0G3F0H1GF3I2G1I3H2I1', // hexahedron
			'0JLGR0RTFN0NPHJFK2PNFT3MKGL1QOGO3TRHP2USHS1LJ3OQIM2KMIU1SUIQ' // dodecahedron
		],
		polygons = shapes[s], // polygons of the current shape
		polygonSides = s < 3 ? 3 : s + 1, // polygon vertex count of the current shape
		si = sin (r),
		co = cos (r),
		i = polygons.length / polygonSides,
		j, k, l, m, vertex, projected, projectedCoords;
	}
	
	// draw shape
	c.clearRect (0, 0, w, h);
	c.fillStyle = '#084';
	while (i--) {
		// draw polygons
		c.beginPath ();
		projectedCoords = [];
		j = polygonSides + 1;
		while (j--) {
			// calculate rotated vertex
			k = 3 * polygons.charCodeAt (i * polygonSides + j % polygonSides) - 144;
			l = vertexTable[vertices[k]];
			m = vertexTable[vertices[k + 1]];
			vertex = [l * co - m * si, l * si + m * co, vertexTable[vertices[k + 2]], 1];
			// calculate projected coordinate
			projectedCoords[j] = projected = [0, 0, 0, 0];
			for (k in matrix) { // matrix has 16 elements
				projected[~~(k / 4)] += vertex[k % 4] * matrix[~~(k / 4) + k % 4 * 4];
			}
			for (k in size) { // size has 2 elements
				projected[k] = (projected[k] / projected[3] / 2 + .5) * size[k];
			}
			c.lineTo (projected[0], h - projected[1]);
		}
		// show only counter clockwise projected polygons
		k = projectedCoords[1];
		l = projectedCoords[2];
		if (projectedCoords[0][0] * (k[1] - l[1]) + k[0] * l[1] > projectedCoords[0][1] * (k[0] - l[0]) + k[1] * l[0]) {
			c.fill ();
			c.stroke ();
		}
	}
	r -= 0.005;
	requestAnimationFrame (R);
}

var s = 3, r = 0;
b.onclick = function ()
{
	s = ++s % 5;
};
R ();
