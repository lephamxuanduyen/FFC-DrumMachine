import { AudioClip } from '../type'
import { GridItem, Text } from '@chakra-ui/react'

interface DrumProps {
    audioClip: AudioClip
    isPower: boolean
    volume: number
}

const Drum = ({ audioClip, isPower, volume }: DrumProps) => {
    const playSound = (clip: AudioClip) => {
        (document.getElementById(clip.keyTrigger) as HTMLAudioElement)
            .play()
            .catch(console.error)
        document.getElementById("display")!.innerText = isPower ? clip.id.split("-").join(" ") : "";
        (document.getElementById(clip.keyTrigger) as HTMLAudioElement)
            .volume = volume
    }
    return (
        <GridItem
            id={`drum-${audioClip.keyTrigger}`}
            w={"100px"}
            h={"80px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={"5px"}
            cursor={"pointer"}
            bgColor={"grey"}
            boxShadow={"2px 2px 2px #222, 0 0 2px #2f2f2f"}
            fontWeight={"bold"}
            onClick={() => playSound(audioClip)}
        >
            {
                isPower ?
                    <audio
                        id={audioClip.keyTrigger}
                        src={audioClip.url}
                    />
                    : <audio
                        id={audioClip.keyTrigger}
                        src={audioClip.url}
                        muted
                    />
            }
            <Text>{audioClip.keyTrigger}</Text>
        </GridItem>
    )
}

export default Drum