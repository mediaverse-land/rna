// import { StorageService } from "../services/storage.service";

// const _storage = new StorageService();

// export const IS_FIRST_TIME_BOTTOM_BAR_ACTION =
//   "IS_FIRST_TIME_BOTTOM_BAR_ACTION";
// export const IS_FIRST_TIME_EXPLORE_NAVIGATION_BAR_ACTION =
//   "IS_FIRST_TIME_EXPLORE_NAVIGATION_BAR_ACTION";
// export const IS_FIRST_TIME_SINGLE_VIDEO_NON_PERMISSION_ACTION =
//   "IS_FIRST_TIME_SINGLE_VIDEO_NON_PERMISSION_ACTION";
// export const IS_FIRST_TIME_SINGLE_VIDEO_WITH_PERMISSION_ACTION =
//   "IS_FIRST_TIME_SINGLE_VIDEO_WITH_PERMISSION_ACTION";

// export class TourController {
//   canStart: any;
//   start: any;
//   stop: any;
//   eventEmitter: any;
//   isFirstTime = false;

//   constructor(useTourGuideController: any) {
//     const { canStart, start, stop, eventEmitter } = useTourGuideController();

//     this.canStart = canStart;
//     this.start = start;
//     this.stop = stop;
//     this.eventEmitter = eventEmitter;
//   }

//   // If this is not the first time that user opens the app
//   private async _isActiveTour() {
//     const exists = await _storage.get(IS_FIRST_TIME_BOTTOM_BAR_ACTION);
//     if (exists) {
//       this.isFirstTime = true;
//     }
//   }

//   //   private async _deActiveTour() {
//   //     const res = await _storage.set(IS_FIRST_TIME_ACTION, IS_FIRST_TIME_ACTION);
//   //     if (res) {
//   //       this.isFirstTime = true;
//   //     }
//   //   }

//   _start() {
//     this.start();

//     return this.eventEmitter;
//   }

//   _handleOnStart() {}

//   //   const handleOnStart = () => {
//   //     if(true){
//   //         return
//   //     }
//   //   }
//   //   const handleOnStop = () => console.log("stop");
//   //   const handleOnStepChange = () => console.log(`stepChange`);

//   //   useEffect(() => {
//   //     eventEmitter.on("start", handleOnStart);
//   //     eventEmitter.on("stop", handleOnStop);
//   //     eventEmitter.on("stepChange", handleOnStepChange);

//   //     return () => {
//   //       eventEmitter.off("start", handleOnStart);
//   //       eventEmitter.off("stop", handleOnStop);
//   //       eventEmitter.off("stepChange", handleOnStepChange);
//   //     };
//   //   }, []);
// }
