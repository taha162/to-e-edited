# Scroll Physics Machine Architecture

This portfolio now treats scroll as force input into a light mechanical system. The DOM remains the narrative layer; React Three Fiber owns the engineered machine layers; cannon-es supplies damped mass behavior for scroll and opening transitions.

## Architecture

- `components/SmoothScroll.tsx` uses Lenis `lerp` damping so wheel input resolves like inertia instead of a fixed-duration tween.
- `components/machine/ScrollMachineOverlay.tsx` creates a zero-gravity cannon-es body. Scroll progress is the target, the body position is the damped mechanical response, and velocity becomes the load readout.
- `components/machine/GyroCoreStage.tsx` renders the hero gyroscope in R3F. Scroll impulse drives ring torque, lateral drift, and core precession through `useCannonSpringScalar`.
- `components/machine/ExplodedPortfolioStage.tsx` renders each case study as separated 3D plates, rails, slabs, fasteners, and a data core. Opening the modal moves the assembly from compact to exploded positions through the same mass spring.
- `components/machine/useDeviceProfile.ts` centralizes mobile, reduced-motion, and DPR budgets.

## Interaction Map

- Wheel/touch scroll -> Lenis damping -> window scroll position.
- Scroll position -> cannon-es mass in `ScrollMachineOverlay` -> progress rail, gears, load vector.
- Scroll position + velocity -> cannon-es mass in `GyroCoreStage` -> gyroscope torque and precession.
- Project card click/Enter/Space -> `WorkModal` opens -> `ExplodedPortfolioStage` mounts -> assembly target changes from `0` to `1` -> individual parts separate in 3D.
- Escape/backdrop/close -> modal unmounts and body scroll is restored.

## Performance Strategy

- One low-poly hero canvas and one modal canvas only while a case is open.
- DPR is capped: desktop up to `1.65`, mobile up to `1.2`, reduced motion at `1`.
- Mobile disables antialiasing, lowers particle count, reduces dust, scanlines, light leaks, and side readout detail.
- No postprocessing stack, environment maps, dynamic shadows, bloom, or high-segment geometry.
- R3F scenes use mesh primitives and instanced orbiting nodes for cheap mechanical detail.
- Canvas layers are pointer-inert so regular navigation and accessibility remain DOM-driven.

## Code Samples

Scroll force into a cannon-es mass:

```ts
const compression = target - body.position.x;
force.set(compression * 86, 0, 0);
body.applyForce(force, body.position);
world.step(1 / 60, 1 / 60, 2);
```

Shared spring primitive used inside R3F:

```ts
const progress = useCannonSpringScalar(target, {
  mass: 0.88,
  stiffness: 92,
  damping: 0.58
});
```

Exploded part mapping:

```ts
group.position.set(
  lerp(part.assembled[0], part.exploded[0], amount),
  lerp(part.assembled[1], part.exploded[1], amount),
  lerp(part.assembled[2], part.exploded[2], amount)
);
```
