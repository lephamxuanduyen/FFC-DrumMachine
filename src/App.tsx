import { Row } from "./components/elements/Row";
import { Col } from "./components/elements/Col"
import { Box, Grid, Input, Text } from "@chakra-ui/react";
import Drum from "./components/Drum";
import { HeaterKit, SmoothPianoKit } from "./assets/AudioClips";
import React, { useEffect, useState } from "react";
const App: React.FC = () => {
  const [isPower, setIsPower] = useState<boolean>(true)
  const [isBank, setIsBank] = useState<boolean>(true)
  const [volume, setVolume] = useState<number>(0.3)

  const changVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value))
    document.getElementById("display")!.innerText = `Volume: ${volume * 100}`
    console.log(volume)
  }

  useEffect(() => {
    const playSound = (e: KeyboardEvent) => {
      const clip = (isBank ? HeaterKit : SmoothPianoKit).find((clip) => e.key.toUpperCase() === clip.keyTrigger)
      if (!clip) return
      (document.getElementById(clip.keyTrigger) as HTMLAudioElement)
        .play()
        .catch(console.error)
      document.getElementById("display")!.innerText = clip.id.split("-").join(" ");
      (document.getElementById(clip.keyTrigger) as HTMLAudioElement)
        .volume = volume
    }

    window.addEventListener('keydown', playSound)

    return () => {
      window.removeEventListener('keydown', playSound)
    }
  }, [])

  return (
    <Col
      bgColor={"#8d8d8d"}
      w={"100vw"}
      minH={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Row
        bgColor={"#b3b3b3"}
        w={"660px"}
        border={"2px solid orange"}
        justifyContent={"space-between"}
      >
        <Grid
          templateColumns={"repeat(3,1fr)"}
          gap={"10px"}
          m={"20px"}
        >
          {
            (isBank ? HeaterKit : SmoothPianoKit).map((clip) => {
              return (
                <Drum audioClip={clip} isPower={isPower} volume={volume} key={clip.keyCode} />
              )
            })
          }
        </Grid>
        <Col alignItems={"center"} justifyContent={"center"} m={"20px"}>
          <Text fontWeight={"bold"}>Power</Text>
          <Box className="power-control"
            border={"2px solid #000"}
            bgColor={"#000"}
            p={"1px"}
            w={"50px"}
            h={"20px"}
            pos={'relative'}
            cursor={"pointer"}
            onClick={() => setIsPower(!isPower)}
          >
            <Box className="select"
              bgColor={"#0000ff"}
              w={"23px"}
              h={"17px"}
              top={0}
              left={isPower ? "calc(100% - 23px)" : 0}
              pos={'absolute'}
            />
          </Box>
          <Box id="display" p={"15px"} bgColor={"grey"} w={"200px"} h={"54px"} m={"15px auto"} textAlign={"center"} fontWeight={"bold"} />
          <Input id="volume"
            type="range"
            max="1" min="0" step={"0.01"}
            defaultValue={0.3}
            h={"5px"}
            border={"1px solid #000"}
            bgColor={"#333"}
            borderRadius={0}
            boxShadow={"2px 2px 2px #222, 0 0 2px #2f2f2f"}
            margin={"12.5px 0"}
            onChange={changVolume}
          />
          <Text fontWeight={"bold"}>Bank</Text>
          <Box className="bank-control"
            border={"2px solid #000"}
            bgColor={"#000"}
            p={"1px"}
            w={"50px"}
            h={"20px"}
            pos={'relative'}
            cursor={"pointer"}
            onClick={() => {
              setIsBank(!isBank)
              document.getElementById("display")!.innerText = isBank ? "Smooth Piano Kit" : "Heater Kit"
            }}>
            <Box className="select"
              bgColor={"#0000ff"}
              w={"23px"}
              h={"17px"}
              top={0}
              left={isBank ? 0 : "calc(100% - 23px)"}
              pos={'absolute'}
            />
          </Box>
        </Col>
      </Row>
    </Col>
  );
}

export default App;
