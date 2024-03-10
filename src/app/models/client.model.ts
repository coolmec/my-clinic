export interface Client {
  id?;
  nom;
  prenom;
  dateNaiss: Date;
  sexe;
  typeIdentite;
  numIdentite;
  nationalite;
  pays?;
  ville?;
  quartier?;
  tel1;
  tel2?;
  email?;
  login?;
  mdp?;
  dateEnreg: Date;
}
