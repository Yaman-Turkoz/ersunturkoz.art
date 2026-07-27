import { useTranslation } from 'react-i18next'
import DilGecis from './DilGecis'
import { troyaSiir } from '../data/troyaSiir'

// Girinti kademesi × CSS'teki --siir-birim değeri kadar soldan boşluk verir.
function TroyaSiir() {
  const { i18n } = useTranslation()
  const dil = i18n.resolvedLanguage
  const dizeler = troyaSiir[dil] || troyaSiir.tr

  return (
    <DilGecis className="troya-siir">
      {dizeler.map((dize, i) =>
        dize.break ? (
          <div key={i} className="troya-siir-bosluk" aria-hidden="true" />
        ) : (
          <div
            key={i}
            className="troya-siir-dize"
            style={{ paddingLeft: `calc(var(--siir-birim) * ${dize.level || 0})` }}
          >
            {dize.text}
          </div>
        ),
      )}
    </DilGecis>
  )
}

export default TroyaSiir
