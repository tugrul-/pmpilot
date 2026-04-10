import Link from 'next/link'

export default function TeslimatVeIadePage() {
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
        <p className="eyebrow">Yasal</p>
        <h1 className="legal-title">Teslimat ve İptal / İade Koşulları</h1>
        <p className="legal-date">Son güncelleme: 10 Nisan 2026</p>

        <div className="legal-body">
          <p>
            Bu sayfa, <strong>PMPilot</strong> (Twino Yazılım Hizmetleri Ltd. Şti.) tarafından
            sunulan dijital abonelik hizmetinin teslimat, iptal ve iade koşullarını
            açıklamaktadır.
          </p>

          <h2>1. Hizmetin Niteliği</h2>
          <p>
            PMPilot, internet üzerinden sunulan bir SaaS (hizmet olarak yazılım) platformudur.
            Satın alınan abonelik; fiziksel bir ürün değil, platforma dijital erişim hakkıdır.
            Bu nedenle "teslimat" kavramı, hizmete erişimin etkinleştirilmesi anlamına gelmektedir.
          </p>

          <h2>2. Dijital Teslimat</h2>
          <ul>
            <li>Ödemenin başarıyla onaylanmasının ardından aboneliğiniz <strong>anında</strong> aktive edilir.</li>
            <li>Platforma <a href="https://pmpilot.org/dashboard">pmpilot.org/dashboard</a> adresinden hemen erişebilirsiniz.</li>
            <li>Aktivasyon e-postası kayıtlı e-posta adresinize gönderilir.</li>
            <li>Teknik bir sorun nedeniyle erişim sağlanamıyorsa <a href="mailto:info@twino.digital">info@twino.digital</a> adresine başvurunuz.</li>
          </ul>

          <h2>3. Abonelik İptali</h2>
          <ul>
            <li>Aboneliğinizi dilediğiniz zaman iptal edebilirsiniz.</li>
            <li>İptal işlemi, mevcut ödeme döneminin <strong>sonunda</strong> geçerli olur.</li>
            <li>İptal ettiğinizde, dönem sonuna kadar platforma erişiminiz devam eder.</li>
            <li>
              İptal için: Platform ayarları üzerinden veya
              <a href="mailto:info@twino.digital"> info@twino.digital</a> adresine
              "Abonelik İptali" konulu e-posta göndererek işlem yapılabilir.
            </li>
          </ul>

          <h2>4. İade Politikası</h2>
          <p>
            PMPilot dijital bir hizmet olduğundan, 6502 sayılı Kanun ve Mesafeli Sözleşmeler
            Yönetmeliği kapsamındaki istisnalar aşağıdaki şekilde uygulanır:
          </p>

          <h3>Genel Kural</h3>
          <p>
            Ödeme tamamlandıktan ve platforma erişim sağlandıktan sonra, dijital hizmetin
            ifasına başlanmış olması nedeniyle <strong>cayma hakkı kullanılamaz ve ücret
            iadesi yapılmaz.</strong>
          </p>

          <h3>İstisna Durumlar</h3>
          <p>Aşağıdaki durumlarda kısmi veya tam iade değerlendirilebilir:</p>
          <ul>
            <li>
              <strong>Teknik erişim sorunu:</strong> Ödeme sonrası platforma hiç erişim
              sağlanamamış ve sorun tarafımızdan kaynaklanıyorsa, ücretin tamamı iade edilir.
            </li>
            <li>
              <strong>Çift ödeme:</strong> Teknik hata nedeniyle aynı dönem için iki kez
              ödeme alınmışsa, fazladan alınan tutar iade edilir.
            </li>
            <li>
              <strong>İlk 48 saat:</strong> Aboneliğin ilk 48 saati içinde iptal talebinde
              bulunulması ve platformun fiilen kullanılmamış olması durumunda, iade talebi
              münferiden değerlendirilir.
            </li>
          </ul>

          <h2>5. İade Başvurusu</h2>
          <p>İade talebinde bulunmak için:</p>
          <ol>
            <li><a href="mailto:info@twino.digital">info@twino.digital</a> adresine e-posta gönderin.</li>
            <li>E-postanın konusuna "İade Talebi" yazın.</li>
            <li>Kayıtlı e-posta adresinizi, ödeme tarihini ve talebinizin gerekçesini belirtin.</li>
          </ol>
          <p>
            Talepler en geç <strong>5 iş günü</strong> içinde yanıtlanır. Onaylanan iadeler,
            ödemenin yapıldığı yöntemle <strong>7-14 iş günü</strong> içinde gerçekleştirilir.
          </p>

          <h2>6. Plan Değişikliği (Yükseltme / Düşürme)</h2>
          <ul>
            <li><strong>Yükseltme:</strong> Daha üst bir plana geçişte fark tutarı anında tahsil edilir ve yeni özellikler hemen aktif olur.</li>
            <li><strong>Düşürme:</strong> Daha düşük bir plana geçiş, mevcut ödeme döneminin sonunda geçerli olur.</li>
          </ul>

          <h2>7. Hizmet Kesintisi Tazminatı</h2>
          <p>
            Tarafımızdan kaynaklanan ve 24 saati aşan planlı dışı kesintilerde, kesinti
            süresine oranlı hizmet bedeli bir sonraki dönem faturasından mahsup edilir.
            Planlı bakım süreleri önceden duyurulur ve tazminat kapsamı dışındadır.
          </p>

          <h2>8. İletişim</h2>
          <p>
            Teslimat, iptal veya iade konularındaki tüm sorularınız için:
          </p>
          <ul>
            <li>E-posta: <a href="mailto:info@twino.digital">info@twino.digital</a></li>
            <li>Telefon: 0532 302 32 89</li>
            <li>Çalışma saatleri: Pazartesi–Cuma, 09:00–18:00</li>
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
