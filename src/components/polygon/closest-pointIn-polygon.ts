import type { Point } from "../../lib/type";
export function closestPointInPolygon(poly: Point[], pos: Point): Point {
    let closest: Point | null = null;
    let minDist = Infinity;

    for (let i = 0; i < poly.length; i++) {
        const a = poly[i];
        const b = poly[(i + 1) % poly.length];

        if (!a || !b) continue;

        const proj = projectPointToSegment(pos, a, b);
        const dist = distance(pos, proj);

        if (dist < minDist) {
            minDist = dist;
            closest = proj;
        }
    }

    return isInsidePolygon(poly, pos) ? pos : closest!;
}

function projectPointToSegment(p: Point, a: Point, b: Point): Point {
    const ap = { x: p.x - a.x, y: p.y - a.y };
    const ab = { x: b.x - a.x, y: b.y - a.y };
    const abLenSq = ab.x * ab.x + ab.y * ab.y;
    const dot = ap.x * ab.x + ap.y * ab.y;
    const t = Math.max(0, Math.min(1, dot / abLenSq));

    return { x: a.x + ab.x * t, y: a.y + ab.y * t };
}

function distance(a: Point, b: Point): number {
    return Math.hypot(a.x - b.x, a.y - b.y);
}

function isInsidePolygon(poly: Point[], p: Point): boolean {
    if (poly.length < 3) return false;

    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const a = poly[i];
        const b = poly[j];
        if (!a || !b) continue;

        const xi = a.x, yi = a.y;
        const xj = b.x, yj = b.y;

        const intersect =
            (yi > p.y) !== (yj > p.y) &&
            p.x < ((xj - xi) * (p.y - yi)) / (yj - yi) + xi;

        if (intersect) inside = !inside;
    }
    return inside;
}