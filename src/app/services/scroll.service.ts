// import { Injectable } from '@angular/core';
// import { Router, Scroll } from '@angular/router';
// import { ViewportScroller } from '@angular/common';
// import { filter } from 'rxjs/operators';

// @Injectable({ providedIn: 'root' })
// export class ScrollService {
//   constructor(router: Router, viewportScroller: ViewportScroller) {
//     router.events
//       .pipe(filter(e => e instanceof Scroll))
//       .subscribe((e: any) => {
//         if (e.position) {
//           // Back/forward restores position
//           viewportScroller.scrollToPosition(e.position);
//         } else if (e.anchor) {
//           // Anchor link navigation (#id)
//           viewportScroller.scrollToAnchor(e.anchor);
//         } else {
//           // New navigation → scroll to top
//           viewportScroller.scrollToPosition([0, 0]);
//         }
//       });
//   }
// }
