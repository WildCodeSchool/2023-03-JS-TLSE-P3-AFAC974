// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import PropTypes from "prop-types";
// import RedButton from "../RedButton";
// import GreyButton from "../GreyButton";
// import Input from "../Input";
// // import SelectionInput from "../SelectionInput";
// import { FormArtworkArtistContext } from "../../context/FormArtworkArtistContext";

// function ArtistFormModify({
//   modalRef,
//   prevStep,
//   nextStep,
//   dataTechnique,
//   dataArtTrend,
//   selectedTypeId,
//   selectedTechniqueId,
//   selectedArtTrendId,
//   selectedArtistId,
// }) {
//   const {
//     formArtist,
//     handleInputChangeArtist,
//     artTrend,
//     technique,
//     formArtTrend,
//     formTechnique,
//     needToFetch,
//   } = useContext(FormArtworkArtistContext);

//   const [isLoadedArtistId, setIsLoadedArtistId] = useState(false);
//   const [isLoadedTypeId, setIsLoadedTypeId] = useState(false);
//   const [isLoadedTechniqueId, setIsLoadedTechniqueId] = useState(false);
//   const [isLoadedArtTrendId, setIsLoadedArtTrendId] = useState(false);
//   const [dataArtistId, setDataArtistId] = useState(false);
//   const [dataTypeId, setDataTypeId] = useState(false);
//   const [dataTechniqueId, setDataTechniqueId] = useState(false);
//   const [dataArtTrendId, setDataArtTrendId] = useState(false);

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_BACKEND_URL}/artists/${selectedArtistId}`)
//       .then((res) => {
//         setDataArtistId(res.data.nickname);
//         setIsLoadedArtistId(true);
//       })
//       .catch((err) => {
//         console.error(err.message);
//       });
//   }, [needToFetch, selectedArtistId]);

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_BACKEND_URL}/type/${selectedTypeId}`)
//       .then((res) => {
//         setDataTypeId(res.data.name);
//         setIsLoadedTypeId(true);
//       })
//       .catch((err) => {
//         console.error(err.message);
//       });
//   }, [needToFetch, selectedTypeId]);

//   useEffect(() => {
//     axios
//       .get(
//         `${import.meta.env.VITE_BACKEND_URL}/technique/${selectedTechniqueId}`
//       )
//       .then((res) => {
//         setDataTechniqueId(res.data.name);
//         setIsLoadedTechniqueId(true);
//       })
//       .catch((err) => {
//         console.error(err.message);
//       });
//   }, [needToFetch, selectedTechniqueId]);

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_BACKEND_URL}/arttrend/${selectedArtTrendId}`)
//       .then((res) => {
//         setDataArtTrendId(res.data.name);
//         setIsLoadedArtTrendId(true);
//       })
//       .catch((err) => {
//         console.error(err.message);
//       });
//   }, [needToFetch, selectedArtTrendId]);

//   return (
//     <div>
//       {isLoadedArtistId &&
//       isLoadedTypeId &&
//       isLoadedTechniqueId &&
//       isLoadedArtTrendId ? (
//         <div ref={modalRef} className="h-full flex flex-col justify-between">
//           <div>
//             <h2 className="font-semibold text-[20px]">
//               Information relative à l'artiste
//             </h2>
//           </div>
//           <div className="text-[16px] lg:flex flex-col lg:justify-between">
//             <div className="lg:flex lg:justify-between lg:gap-4">
//               <label htmlFor="lastname_artist" className="w-[100%]">
//                 <h3 className="py-4 text-[14px]">Nom de l'artiste *</h3>
//                 <div>
//                   <Input
//                     type="text"
//                     id="lastname_artist"
//                     name="lastname"
//                     placeholder="Nom"
//                     onChange={handleInputChangeArtist}
//                     value={formArtist.lastname}
//                   />
//                 </div>
//               </label>
//               <label htmlFor="firstname_artist" className="w-[100%]">
//                 <h3 className="py-4 text-[14px]">Prénom de l'artiste *</h3>
//                 <div>
//                   <Input
//                     type="text"
//                     id="firstname_artist"
//                     name="firstname"
//                     placeholder="Prénom"
//                     onChange={handleInputChangeArtist}
//                     value={formArtist.firstname}
//                   />
//                 </div>
//               </label>
//               <div className="w-[100%]">
//                 <h3 className="py-4 text-[14px]">Nom d'usage</h3>
//                 <div>
//                   <p className="border-solid border-[1px] border-gray-300 rounded-[4px] p-1 w-[100%]">
//                     {formArtist.nickname}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <label htmlFor="artist_decription" className="w-[100%]">
//               <h3 className="py-4 text-[14px]">Description</h3>
//               <div>
//                 <textarea
//                   id="artist_description"
//                   name="description"
//                   placeholder="Description"
//                   onChange={handleInputChangeArtist}
//                   value={formArtist.description}
//                   className="border border-gray-300 rounded-[4px] p-1 w-[100%] resize-none outline-none overflow-x-hidden"
//                 />
//               </div>
//             </label>
//             <div className="lg:flex lg:justify-between lg:gap-4">
//               <div className="w-[100%]">
//                 <h3 className="py-4 text-[14px]">Techniques</h3>
//                 <div>
//                   <p className="border-solid border-[1px] border-gray-300 rounded-[4px] p-1 w-[100%]">
//                     {formTechnique.name
//                       ? formTechnique.name
//                       : dataTechnique[technique - 1].name}
//                   </p>
//                 </div>
//               </div>
//               <div className="w-[100%]">
//                 <h3 className="py-4 text-[14px]">Courant Artistique</h3>
//                 <div>
//                   <p className="border-solid border-[1px] border-gray-300 rounded-[4px] p-1 w-[100%]">
//                     {formArtTrend.name
//                       ? formArtTrend.name
//                       : dataArtTrend[artTrend - 1].name}
//                   </p>
//                 </div>
//               </div>
//               <label htmlFor="web_site" className="w-[100%]">
//                 <h3 className="py-4 text-[14px]">Lien site internet</h3>
//                 <div>
//                   <Input
//                     type="url"
//                     id="web_site"
//                     name="websiteUrl"
//                     placeholder="Lien site internet"
//                     onChange={handleInputChangeArtist}
//                     value={formArtist.websiteUrl}
//                   />
//                 </div>
//               </label>
//             </div>
//             <div className="lg:flex lg:justify-between lg:gap-4">
//               <label htmlFor="facebook" className="w-[100%]">
//                 <h3 className="py-4 text-[14px]">Lien Facebook</h3>
//                 <div>
//                   <Input
//                     type="url"
//                     id="facebook"
//                     name="facebookUrl"
//                     placeholder="Facebook"
//                     onChange={handleInputChangeArtist}
//                     value={formArtist.facebookUrl}
//                   />
//                 </div>
//               </label>
//               <label htmlFor="twitter" className="w-[100%]">
//                 <h3 className="py-4 text-[14px]">Lien Twitter</h3>
//                 <div>
//                   <Input
//                     type="url"
//                     id="twitter"
//                     name="twitterUrl"
//                     placeholder="Twitter"
//                     onChange={handleInputChangeArtist}
//                     value={formArtist.twitterUrl}
//                   />
//                 </div>
//               </label>
//               <label htmlFor="instagram" className="w-[100%]">
//                 <h3 className="py-4 text-[14px]">Lien Instagram</h3>
//                 <div>
//                   <Input
//                     type="url"
//                     id="instagram"
//                     name="instagramUrl"
//                     placeholder="Instagram"
//                     onChange={handleInputChangeArtist}
//                     value={formArtist.instagramUrl}
//                   />
//                 </div>
//               </label>
//             </div>
//           </div>
//           {!formArtist.firstname || !formArtist.lastname ? (
//             <p className="text-red-500 text-center">
//               Les champs suivis d'un * sont obligatoires.
//             </p>
//           ) : null}
//           <div className="flex justify-between py-4 lg:justify-around ">
//             <div className="px-[10px] w-[100%] h-[30px] lg:w-[30%]">
//               <GreyButton text="Précédent" onClick={prevStep} />
//             </div>
//             <div className="px-[10px] w-[100%] h-[30px] lg:w-[30%]">
//               <RedButton
//                 text="Suivant"
//                 onClick={nextStep}
//                 disabled={!formArtist.firstname || !formArtist.lastname}
//               />
//             </div>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// }

// ArtistFormModify.propTypes = {
//   modalRef: PropTypes.shape(),
//   prevStep: PropTypes.func,
//   nextStep: PropTypes.func,
//   isLoadedArtist: PropTypes.bool.isRequired,
//   isLoadedType: PropTypes.bool.isRequired,
//   isLoadedTechnique: PropTypes.bool.isRequired,
//   isLoadedArtTrend: PropTypes.bool.isRequired,
//   dataArtist: PropTypes.arrayOf([
//     {
//       lastname: PropTypes.string,
//       firstname: PropTypes.string,
//       nickname: PropTypes.string,
//       description: PropTypes.string,
//       imageUrlSmall: PropTypes.string,
//       imageUrlMedium: PropTypes.string,
//       imageUrlLarge: PropTypes.string,
//       websiteUrl: PropTypes.string,
//       facebookUrl: PropTypes.string,
//       instagramUrl: PropTypes.string,
//       twitterUrl: PropTypes.string,
//     },
//   ]),
//   dataType: PropTypes.arrayOf([
//     {
//       name: PropTypes.string,
//     },
//   ]),
//   dataTechnique: PropTypes.arrayOf([
//     {
//       name: PropTypes.string,
//     },
//   ]),
//   dataArtTrend: PropTypes.arrayOf([
//     {
//       name: PropTypes.string,
//     },
//   ]),
//   handleJointureArtisteArtTrend: PropTypes.func.isRequired,
//   handleJointureArtisteTechnique: PropTypes.func.isRequired,
//   jointureVerify: PropTypes.func.isRequired,
//   modify: PropTypes.bool,
//   selectedTypeId: PropTypes.number,
//   selectedTechniqueId: PropTypes.number,
//   selectedArtTrendId: PropTypes.number,
//   selectedArtistId: PropTypes.number,
// };

// ArtistFormModify.defaultProps = {
//   modalRef: {},
//   prevStep: () => {},
//   nextStep: () => {},
//   dataArtwork: {
//     name: "",
//     year: 0,
//     description: "",
//     imageUrlSmall: "",
//     imageUrlMedium: "",
//     imageUrlLarge: "",
//     art_trend_id: 0,
//     type_id: 0,
//     technique_id: 0,
//     artist_id: 0,
//     width_cm: 0,
//     height_cm: 0,
//     depth_cm: 0,
//     artwork_location: "",
//   },
//   dataArtist: {
//     lastname: "",
//     firstname: "",
//     nickname: "",
//     description: "",
//     imageUrlSmall: "",
//     imageUrlMedium: "",
//     imageUrlLarge: "",
//     websiteUrl: "",
//     facebookUrl: "",
//     instagramUrl: "",
//     twitterUrl: "",
//   },
//   dataType: {
//     name: "",
//   },
//   dataTechnique: {
//     name: "",
//   },
//   dataArtTrend: {
//     name: "",
//   },
//   modify: false,
//   selectedTypeId: 0,
//   selectedTechniqueId: 0,
//   selectedArtTrendId: 0,
//   selectedArtistId: 0,
// };

// export default ArtistFormModify;
