import { useFrame } from '@react-three/fiber';

function CameraController({ cameraTarget, zooming, setZooming, focusTarget }) {

    useFrame(({ camera }) => {
        if (zooming) {
            //if (focusTarget.current && cameraTarget.current) {
            //    console.log("Focus Target:", focusTarget.current);
            //    console.log("Camera Target:", cameraTarget.current);
            //}
            // Smoothly move the camera to the target position
            camera.position.lerp(cameraTarget.current, 0.1);

            if (focusTarget.current) {
                camera.lookAt(focusTarget.current);
            }

            // Check if the camera has nearly reached its target
            if (camera.position.distanceTo(cameraTarget.current) < 0.01) {
                setZooming(false); // Stop zooming
            }
        }
        
    });
    return null;
}

export default CameraController;