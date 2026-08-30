import './Privacy.css'

export function PrivacyContent() {
  return (
    <div className="privacy__body">
      <p>
        Radu Pizze prikuplja podatke koje uneseš prilikom online porudžbine: ime, broj telefona,
        adresu dostave (ako je izabereš) i opcionu napomenu.
      </p>
      <h3>Zašto ih koristimo</h3>
      <ul>
        <li>Da primimo i obradimo tvoju porudžbinu</li>
        <li>Da te kontaktiramo radi potvrde ili dostave</li>
      </ul>
      <h3>Čuvanje podataka</h3>
      <p>
        Podatke koristimo isključivo u svrhu porudžbine i ne delimo ih sa trećim stranama, osim
        ako to zakon zahteva ili je neophodno za isporuku (npr. kurirska služba).
      </p>
      <h3>Kolačići</h3>
      <p>
        Sajt koristi lokalno skladište (localStorage) za pamćenje da li si video uvodnu animaciju i
        da li si prihvatio obaveštenje o kolačićima. Ne koristimo reklamne kolačiće trećih strana.
      </p>
      <h3>Tvoja prava</h3>
      <p>
        Možeš zatražiti brisanje ili ispravku podataka kontaktiranjem picerije na adresi Ćirpanova
        2, Novi Sad.
      </p>
      <p className="privacy__updated">Poslednje ažuriranje: avgust 2026.</p>
    </div>
  )
}
