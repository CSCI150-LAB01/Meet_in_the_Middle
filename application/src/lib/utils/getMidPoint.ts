type LocationPoint = [number, number];

/**
 * MITM To Radians Function
 * ------------------------------------------------------------
 * Converts a degree value to radians. This is used to convert
 * the longitude and latitude values to radians for the
 * calculation of the mid-point.
 * 
 * @param value number    The value to convert to radians.
 * @returns number        The value in radians.
 */
const toRad = function (value: number) {
  return (value * Math.PI) / 180;
};

/**
 * MITM To Degrees Function
 * ------------------------------------------------------------
 * Converts a radian value to degrees. This is used to convert
 * the longitude and latitude values to degrees for the
 * calculation of the mid-point.
 * 
 * @param value number    The value to convert to degrees.
 * @returns number        The value in degrees.
 */
const toDeg = function (value: number) {
  return value * (180 / Math.PI);
};

/**
 * MITM Get Middle Location Point
 * ------------------------------------------------------------
 * Returns the mid-point between multiple location points. 
 * Below is a list of sample points and their expected 
 * mid-point.
 * 
 * testData = [
 *  [-119.80115623281625,36.88799993851293], 
 *  [-119.78606873680766,36.74583174602636], 
 *  [-119.64483988072735,36.844862584337804]
 * ]
 * 
 * expectedResult = [ -119.74402900870679, 36.82625217550293 ]
 * 
 * @param locations [[longitude, latitude]] An array of tuples of longitude and latitude.
 * @returns [longitude, latitude] A tuple of longitude and latitude.
 */
export default function getMidPoint(points: LocationPoint[]): LocationPoint | false {
  if (points.length <= 1) return false;
  const pointCount = points.length;

  let pointX = 0.0, pointY = 0.0, pointZ = 0.0;

  points.forEach((point: LocationPoint) => {
    const lon = toRad(point[0])
    const lat = toRad(point[1])

    const a = Math.cos(lat) * Math.cos(lon);
    const b = Math.cos(lat) * Math.sin(lon);
    const c = Math.sin(lat);

    pointX += a;
    pointY += b;
    pointZ += c;
  })

  pointX /= pointCount;
  pointY /= pointCount;
  pointZ /= pointCount;

  const hypotenuse = Math.sqrt(pointX * pointX + pointY * pointY);
  const longitude = Math.atan2(pointY, pointX);
  const latitude = Math.atan2(pointZ, hypotenuse);

  
  return [toDeg(longitude), toDeg(latitude)];
}
