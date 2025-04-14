//The changes should be made only in line 12 inserting API token and in line 21 with the group ID

// import Camera Kit modules
import {
    bootstrapCameraKit,
    createMediaStreamSource,
    transform2D,
} from '@snap/camera-kit';

(async function () {
    // bootstrap CameraKit using TOKEN – here insert the token
    var CameraKit = await bootrapCameraKit ({ apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzQ0NTU2NjgxLCJzdWIiOiIxNjE2NjcxYS0yMjM3LTRmZjMtYWEwYy0zOWE5MGQyNGM0ZmJ-U1RBR0lOR345OWRiMjFmMC01YWRlLTQ4MzUtYTI0ZC0zZmZkZGRkNDNkYjYifQ.kUB84ZR_NTEI1wKgkegSLpTSgCCHRfiSNxOA2w56IPM' })

    // create new Camera Kit session
    const session = await CameraKit.createSession ()

    // replace the Canvas elements with the live output from the CameraKit session
    document.getElementById('canvas').replaceWith(session.output.live)

    //load the specified lens group
    const { lenses } = await cameraKit.lensRepository.loadLensGroups(['1761a911-7108-4d03-98c5-9205be09a2dd']);

    //apply the first lens from the lens group to the CameraKit session
    session.applyLens(lenses[0]);

    //get the user's media stream
    let MediaSteam = await navigator.mediaDevices.getUserMedia({
        video: true
         //for the back camera keep only this:
        //video: {facing mode: 'environment'}
    })

    //create a cameraKit media stream source from thew user's media stream using front camera
    const source = createMediaStreamSource(mediaStream, {
            transform: Transform2D.MirrorX,
            cameraType: 'front'
            //for the back camera keep only this:
            //cameraType: 'back'
        }
    )

    //set the source of Camera Kit Session
    await session.setSource(source);

    //Set the render size of the CameraKit session to the size of the browser window
    session.source.setRenderSize(window.innerWidth, window.innerHeight)

    //start the CameraKit Session
    session.play()
}())
