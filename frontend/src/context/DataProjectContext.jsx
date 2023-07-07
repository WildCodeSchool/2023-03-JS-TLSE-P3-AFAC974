// import { createContext, useState, useEffect, useMemo } from "react";
// import PropTypes from "prop-types";
// import axios from "axios";

// export const DataProjectContext = createContext();

// export function DataProjectProvider({ children }) {
//   const [isLoadedArtist, setIsLoadedArtist] = useState(false);
//   const [isLoadedType, setIsLoadedType] = useState(false);
//   const [isLoadedTechnique, setIsLoadedTechnique] = useState(false);
//   const [isLoadedArtTrend, setIsLoadedArtTrend] = useState(false);
//   const [isLoadedArtistTechnique, setIsLoadedArtistTechnique] = useState(false);
//   const [isLoadedArtTrendArtist, setIsLoadedArtTrendArtist] = useState(false);
//   const [dataArtist, setDataArtist] = useState(false);
//   const [dataType, setDataType] = useState(false);
//   const [dataTechnique, setDataTechnique] = useState(false);
//   const [dataArtTrend, setDataArtTrend] = useState(false);
//   const [dataArtistTechnique, setDataArtistTechnique] = useState(false);
//   const [dataArtTrendArtist, setDataArtTrendArtist] = useState(false);

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_BACKEND_URL}/artists`)
//       .then((res) => {
//         setDataArtist(res.data);
//         setIsLoadedArtist(true);
//       })
//       .catch((err) => {
//         console.error(err.message);
//       });
//   }, []);

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_BACKEND_URL}/type`)
//       .then((res) => {
//         setDataType(res.data);
//         setIsLoadedType(true);
//       })
//       .catch((err) => {
//         console.error(err.message);
//       });
//   }, []);

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_BACKEND_URL}/technique`)
//       .then((res) => {
//         setDataTechnique(res.data);
//         setIsLoadedTechnique(true);
//       })
//       .catch((err) => {
//         console.error(err.message);
//       });
//   }, []);

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_BACKEND_URL}/arttrend`)
//       .then((res) => {
//         setDataArtTrend(res.data);
//         setIsLoadedArtTrend(true);
//       })
//       .catch((err) => {
//         console.error(err.message);
//       });
//   }, []);

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_BACKEND_URL}/artisttechnique`)
//       .then((res) => {
//         setDataArtistTechnique(res.data);
//         setIsLoadedArtistTechnique(true);
//       })
//       .catch((err) => {
//         console.error(err.message);
//       });
//   }, []);

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_BACKEND_URL}/arttrendartist`)
//       .then((res) => {
//         setDataArtTrendArtist(res.data);
//         setIsLoadedArtTrendArtist(true);
//       })
//       .catch((err) => {
//         console.error(err.message);
//       });
//   }, []);
//   const contextValue = useMemo(
//     () => ({
//       isLoadedArtist,
//       isLoadedType,
//       isLoadedTechnique,
//       isLoadedArtTrend,
//       isLoadedArtistTechnique,
//       isLoadedArtTrendArtist,
//       dataArtist,
//       dataType,
//       dataTechnique,
//       dataArtTrend,
//       dataArtistTechnique,
//       dataArtTrendArtist,
//     }),
//     [
//       isLoadedArtist,
//       isLoadedType,
//       isLoadedTechnique,
//       isLoadedArtTrend,
//       isLoadedArtistTechnique,
//       isLoadedArtTrendArtist,
//       dataArtist,
//       dataType,
//       dataTechnique,
//       dataArtTrend,
//       dataArtistTechnique,
//       dataArtTrendArtist,
//     ]
//   );
//   return (
//     <DataProjectContext.Provider value={contextValue}>
//       {children}
//     </DataProjectContext.Provider>
//   );
// }

// DataProjectProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };
