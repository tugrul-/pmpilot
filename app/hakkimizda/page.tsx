import Link from 'next/link'

export default function HakkimizdaPage() {
  return (
    <main className="page legal-page">
      <header className="header">
        <Link href="/" className="logo">PMPilot</Link>
        <nav className="nav">
          <Link href="/login">Giriş Yap</Link>
          <Link href="/signup" className="btn btn-primary">Başla</Link>
        </nav>
      </header>

      <section className="legal-content">
        <p className="eyebrow">Kurumsal</p>
        <h1 className="legal-title">Hakkımızda</h1>

        <div className="legal-body">
          <h2>PMPilot Nedir?</h2>
          <p>
            PMPilot, proje yöneticileri ve organizasyonlar için geliştirilmiş yapay zeka destekli
            bir proje yönetim platformudur. Proje bilgilerinin tek bir merkezde toplanmasını,
            temel proje belgelerinin düzenli biçimde saklanmasını ve yapay zeka aracılığıyla
            risk analizi, bütçe analizi, paydaş haritası ile profesyonel sunumların otomatik
            olarak oluşturulmasını sağlar.
          </p>
          <p>
            PMPilot; proje yönetiminin ağır araç setleri olmadan, sade ve etkili bir şekilde
            yürütülmesi gerektiğine inanan ekipler için tasarlanmıştır.
          </p>

          <h2>Twino Yazılım Hizmetleri Ltd. Şti.</h2>
          <p>
            PMPilot; yazılım geliştirme ve dijital dönüşüm alanında faaliyet gösteren
            <strong> Twino Yazılım Hizmetleri Ltd. Şti.</strong> tarafından geliştirilmekte
            ve işletilmektedir.
          </p>

          <h2>Şirket Bilgileri</h2>
          <table className="legal-table">
            <tbody>
              <tr>
                <td>Ticari Unvan</td>
                <td>Twino Yazılım Hizmetleri Ltd. Şti.</td>
              </tr>
              <tr>
                <td>Adres</td>
                <td>Teknopark Ankara, İvedikOsb Mah. 2224. Cadde No: 1/116, Yenimahalle / Ankara</td>
              </tr>
              <tr>
                <td>Vergi Dairesi</td>
                <td>İvedik Vergi Dairesi</td>
              </tr>
              <tr>
                <td>Vergi Kimlik No</td>
                <td>9591429157</td>
              </tr>
              <tr>
                <td>MERSİS No</td>
                <td>0859142915700001</td>
              </tr>
              <tr>
                <td>Telefon</td>
                <td>0532 302 32 89</td>
              </tr>
              <tr>
                <td>E-posta</td>
                <td><a href="mailto:info@twino.digital">info@twino.digital</a></td>
              </tr>
              <tr>
                <td>Web Sitesi</td>
                <td><a href="https://pmpilot.org">pmpilot.org</a></td>
              </tr>
            </tbody>
          </table>

          <h2>Misyonumuz</h2>
          <p>
            Proje yöneticilerine, ekiplerine ve organizasyonlarına yapay zekanın gücünü
            erişilebilir ve kullanılabilir biçimde sunmak; proje süreçlerini daha şeffaf,
            daha analitik ve daha verimli hale getirmek.
          </p>

          <h2>İletişim</h2>
          <p>
            Sorularınız, önerileriniz veya iş birliği talepleriniz için bize ulaşabilirsiniz:
          </p>
          <ul>
            <li>E-posta: <a href="mailto:info@twino.digital">info@twino.digital</a></li>
            <li>Telefon: 0532 302 32 89</li>
            <li>Adres: Teknopark Ankara, İvedikOsb Mah. 2224. Cadde No: 1/116, Yenimahalle / Ankara</li>
          </ul>
        </div>
      </section>

      <footer className="legal-footer">
        <Link href="/">← Ana Sayfaya Dön</Link>
        <span>© 2026 PMPilot · Twino Yazılım Hizmetleri Ltd. Şti.</span>
      </footer>
    </main>
  )
}
