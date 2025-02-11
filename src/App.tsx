import { useState } from 'react';
import './App.css';
import { Button, Typography, Tooltip, ButtonGroup } from '@mui/material';
import styled from 'styled-components';
import racetrack from '../public/racetrack.jpg';

const GameBoard = styled.div`
  padding-top: 2%;
  color: #E1F2FE;
`

const TitleAndRules = styled.div`
  padding-left: 4%;
  @media (max-width: 900px) {
    padding-left: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const RaceMessage = styled.div`
  width: 700px;
  font-size: 30px;
  color: #ED9B40;
  margin: 2% auto;
  @media (max-width: 900px) {
    margin-left: 20px;
    font-size: 22px;
  }
`;

const Body = styled.div`
  display: flex;
  justify-content: space-between;
`

const InputRacers = styled.div`
  margin-left: 40px;
  input {
    background: transparent;
    height: 32px;
    color: white;
    margin-right: 5%;
  }
`

const NameBackground = styled.div`
  border-radius: 10px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3));
`

const RacerName = styled.div`
  font-size: 28px;

  @media (max-width: 700px) {
    font-size: 20px;
  }
`

const RaceStats = styled.div`
  position: absolute;
  padding: 4% 5%;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  font-size: 32px;
  background-color: rgba(0, 0, 0, 0.8);
`;

const RaceTrack = styled.div`
  background-image: url(${racetrack});
  background-size: 100% 400px;
  background-repeat: repeat-y;
  padding: 6px 30px;
  border-radius: 2px;
  @media (max-width: 700px) {
    padding: 4px 0px;
    margin-left: -30px;
  }
`;

const DeleteBtn = styled.button`
  position: absolute;
  left: 18px;
  font-size: 30px;
  background: transparent;
  outline: none;
  border: none;
  &:hover {
    cursor: pointer;
    font-size: 35px;
    outline: none;
  }
  @media (max-width: 700px) {
    left: 0px;
    font-size: 18px;
  }
`

const CarrotBtn = styled.button`
  position: absolute;
  left: 42px;
  font-size: 30px;
  background: transparent;
  border: none;
  &:hover {
    cursor: pointer;
    font-size: 35px;
  }
  @media (max-width: 700px) {
    left: 22px;
    font-size: 18px;
  }
`











function App() {

  const [name, setName] = useState("");
  const [currentRound, setCurrentRound] = useState(0);
  const [finishPlace] = useState(13);
  const [raceStart, setRaceStart] = useState(false);
  const [raceMessage, setRaceMessage] = useState("Welcome! Add Contestants, then hit start!");
  const [winCondition, setWinCondition] = useState(false);
  // const [winnerName, setWinnerName] = useState("");
  const [racers, setRacers] = useState<any[]>([]);
  const [icons] = useState(["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳", "🥴", "🤢", "🤮", "🤒", "🤕", "🤑", "🤠", "😈", "👹", "💀", "👽", "👾", "🤖", "🎃", "🧠","😭", "😤", "🤬", "🤯", "🥶", "😱", "🐲"]);
  const [lastRacers, setLastRacers] = useState<any[]>([]);
  const [raceSpeed, setRaceSpeed] = useState(420);

  const inputAttribute = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const inputRacers = () => {
    return (
      <InputRacers>
        <input
          placeholder="Contestant Name" 
          name="name" 
          type="text"
          value={name} 
          onChange={(e) => inputAttribute(e)}/>
        <Tooltip title="Add Contestant!" arrow>
          <Button id="input_btn" variant="contained" color="primary" onClick={() => inputBtn()}>
            +
          </Button>
        </Tooltip>
      </InputRacers>
    )
  }

  const inputBtn = () => {
    const newName = refactorName(name);
    if (newName !== '') { 
      const message = `${newName} has been added to the race!`
      setRaceMessage(message);
      const newRacer = {
        id: Date.now(),
        name: newName,
        currentPlace: 0,
        speedboost: false,
        icon: icons[Math.floor(Math.random() * icons.length)],
      }
      setRacers([...racers, newRacer]);
      setName("");
    } else {
      setRaceMessage("Please enter a name!");
    }
  }

  const refactorName = (name: string) => {
    const characters = name.split('')
    let newName = ''
    if (characters.length) {
      characters.forEach((character, index) => {
        if ((index > 17) || (character === '?')) {
          return
        }
        if (!index) {
          newName += character.toUpperCase()
        } else {
          newName += character
        }
      })
    }
    return newName;
  }

  const deleteRacer = (id: number) => {
    const smallerRoster = racers.map(racer => {
      if (racer.id === id) {
        if (!racer.icon) {
          return null;
        } else {
          const message = racer.name + ' just lost their head!';
          setRaceMessage(message);
          racer.icon = '';
          racer.name = '';
        }
      }
      return racer;
    }).filter(racer => racer !== null);
    setRacers(smallerRoster as any[]);
  }

  const boostRacer = (id: number) => {
    const boostRoster = racers.map(racer => {
      if (racer.id === id) {
        racer.speedboost = true;
        let message = '';
        if (racer.name) {
          message += racer.name
        } else {
          message += 'A headless donkey'
        }
        message += ' has been BOOSTED!';
        setRaceMessage(message);
      }
      return racer;
    });
    setRacers(boostRoster);
  }

  const setupRace = () => {
    if (racers.length === 0) {
      setRaceMessage("Add Contestants!");
      return;
    }
    setRaceMessage("The race has started!!");
    setRaceStart(true);
    startRace();
  }

  const speedBoostCheck = (currentRacer: any) => {
    if ((currentRacer.speedboost === true) && (currentRacer.currentPlace < 9)) {
      return true;
    }
    return false;
  }

  const startRace = () => {
    const numRacers = racers.length;
    const randomIndex = Math.floor((Math.random() * numRacers));
    const racerUpdate = [...racers];
    if (racerUpdate[randomIndex].name) {
      racerUpdate[randomIndex].currentPlace++;
    }
    if (speedBoostCheck(racerUpdate[randomIndex])) {
      racerUpdate[randomIndex].currentPlace++;
    }
    setCurrentRound(currentRound + 1);
    setRacers(racerUpdate);
    if ((racerUpdate[randomIndex].currentPlace >= finishPlace)) {
      winner(racerUpdate, randomIndex);
    }
    setTimeout(() => {
      if (!winCondition) {
        startRace();
      }
    }, racerUpdate[randomIndex].name ? raceSpeed : 0);
  }

  const reRace = () => {
    const refreshRacers = racers.map(racer => {
      return {
        ...racer,
        currentPlace: 0
      }
    });
    setCurrentRound(0);
    setWinCondition(false);
    setRaceStart(false);
    setRacers(refreshRacers);
  }

  const winner = (racerUpdate: any[], randomIndex: number) => {
    whosWinning();
    setTimeout(() => {
      setWinCondition(true);
    }, 600);
    const message = racerUpdate[randomIndex].name + " is the winner!!";
    setRaceMessage(message);
  }

  const renderWinners = (racer: any, index: number) => {
    return (
      <p key={index}>
        {index === 0 && "1st place: "}
        {index === 1 && "2nd place: "}
        {index === 2 && "3rd place: "}
        {index >= 3 && `${index + 1}th place: `}
        {racer.name}
      </p>
    )
  }

  const whosWinning = () => {
    const lastRacerRoster = [...racers];
    const sortedRacers = lastRacerRoster.sort((a, b) => {
      return b.currentPlace - a.currentPlace;
    });
    const winnerRole = sortedRacers.filter(racer => racer.name);
    const displayedWinners = winnerRole.map((racer, index) => renderWinners(racer, index));
    setLastRacers(displayedWinners);
  }

  const setSpeed = (speed: number) => {
    setRaceSpeed(speed);
  }

  const displayRacers = racers.map(racer => {
    const racePosition = `racer place${racer.currentPlace}`;
    return (
      <div key={racer.id} className={racePosition}>
        <Tooltip title="Stabby stab cut cut">
          <DeleteBtn onClick={() => deleteRacer(racer.id)}>
            🗡
          </DeleteBtn>
        </Tooltip>
        <Tooltip title="BOOST!" arrow>
          <CarrotBtn onClick={() => boostRacer(racer.id)}>
            <span role="img" aria-label="carrot">🥕</span>
          </CarrotBtn>
        </Tooltip>
        <Typography variant="h4">
          {racer.icon}
        </Typography>
        <br/>
        <NameBackground>
          <RacerName>
            {racer.name}
          </RacerName> 
        </NameBackground>
      </div>
    );
  });

  return (
    <GameBoard>
      <Header>
        {(!raceStart) && (
          <TitleAndRules>
            <Typography variant="h2">Dubious Derby</Typography>
            {raceStart === false && inputRacers()}
          </TitleAndRules>
        )}
        {(!raceStart) && (
          <div id="speed_and_start_buttons">
            <Tooltip title="Game Speed" arrow>
              <ButtonGroup
                size="large"
                color="primary"
                aria-label="speed buttons"
              >
                <Tooltip title="Slow Speed" arrow>
                  <Button
                    id="slowSpeed"
                    variant="contained"
                    color="primary"
                    onClick={() => setSpeed(680)}
                  >
                    Slow
                  </Button>
                </Tooltip>
                <Tooltip title="Normal Speed" arrow>
                  <Button
                    id="normSpeed"
                    variant="contained"
                    color="primary"
                    onClick={() => setSpeed(420)}
                  >
                    Norm
                  </Button>
                </Tooltip>
                <Tooltip title="Fast Speed" arrow>
                  <Button
                    id="fastSpeed"
                    variant="contained"
                    color="primary"
                    onClick={() => setSpeed(180)}
                  >
                    Fast
                  </Button>
                </Tooltip>
              </ButtonGroup>
            </Tooltip>
            <Tooltip title="Start the Race!" arrow>
              <Button
                id="start_btn"
                variant="contained"
                color="primary"
                size="large"
                onClick={() => setupRace()}
              >
                Start
              </Button>
            </Tooltip>
          </div>
        )}
      </Header>
      <Body>
        <RaceMessage>{raceMessage}</RaceMessage>
      </Body>
      {racers.length > 0 && <RaceTrack>{displayRacers}</RaceTrack>}
      {(winCondition) && (
        <RaceStats>
          {lastRacers}
          <Button
            id="rerace_btn"
            variant="contained"
            color="primary"
            onClick={() => reRace()}
          >
            Reset Race!
          </Button>
        </RaceStats>
      )}
    </GameBoard>
  );
}

export default App;
