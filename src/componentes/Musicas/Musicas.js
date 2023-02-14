import React, { useState, useEffect } from "react";
import {
  Botao,
  ContainerInputs,
  ContainerMusicas,
  InputMusica,
  Musica,
} from "./styled";
import axios from "axios";

// const musicasLocal = [
//   {
//     artist: "Artista 1",
//     id: "1",
//     name: "Musica1",
//     url: "http://spoti4.future4.com.br/1.mp3",
//   },
//   {
//     artist: "Artista 2",
//     id: "2",
//     name: "Musica2",
//     url: "http://spoti4.future4.com.br/2.mp3",
//   },
//   {
//     artist: "Artista 3",
//     id: "3",
//     name: "Musica3",
//     url: "http://spoti4.future4.com.br/3.mp3",
//   },
// ];

export default function Musicas(props) {
  const [musicas, setMusicas] = useState([]);
  const [artista, setArtista] = useState("");
  const [musica, setMusica] = useState("");
  const [url, setUrl] = useState("");

  const headers = { headers: { Authorization: "henrique-batista-conway" } };

  const getPlaylistTracks = () => {
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`,
        headers
      )
      .then((resposta) => {
        setMusicas(resposta.data.result.tracks);
      })
      .catch((erro) => {
        console.error(erro.message);
      });
  };
  useEffect(() => {
    getPlaylistTracks(musicas.id);
  }, []);

  const addTrackToPlaylist = () => {
    const newTrack = {
      name: musica,
      artist: artista,
      url: url,
    };
    axios
      .post(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`,
        newTrack,
        headers
      )
      .then(() => {
        getPlaylistTracks()
        
      })
      .catch((erro) => {
        alert(erro.message);
      });
  };

  const deleteTrackFromPlaylist = (id) => {
    axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${id}`, headers).then(()=>{
        getPlaylistTracks()

    }).catch((erro)=>{
        alert(erro.message)
    })
  }


  return (
    <ContainerMusicas>
      <h2>{props.playlist.name}</h2>
      {musicas.map((musica) => {
        return (
          <Musica key={musica.id}>
            <h3>
              {musica.name} - {musica.artist}
            </h3>
            <audio src={musica.url} controls />
            <button onClick={()=>deleteTrackFromPlaylist(musica.id)}>X</button>
          </Musica>
        );
      })}
      <ContainerInputs>
        <InputMusica
          placeholder="artista"
          onChange={(e) => {
            setArtista(e.target.value);
          }}
        />
        <InputMusica
          placeholder="musica"
          onChange={(e) => {
            setMusica(e.target.value);
          }}
        />
        <InputMusica
          placeholder="url"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <Botao onClick={addTrackToPlaylist}>Adicionar musica</Botao>
      </ContainerInputs>
    </ContainerMusicas>
  );
}
