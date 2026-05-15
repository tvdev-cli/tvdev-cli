import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import InstallHero from '@/components/InstallHero'
import PlatformTabs from '@/components/PlatformTabs'
import Features from '@/components/Features'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

async function getLatestVersion(): Promise<string> {
  try {
    const res = await fetch(
      'https://api.github.com/repos/tvdev-cli/tvdev-cli/releases/latest',
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return 'v1.0.0'
    const data = await res.json()
    return data.tag_name ?? 'v1.0.0'
  } catch {
    return 'v1.0.0'
  }
}

export default async function Home() {
  const version = await getLatestVersion()

  return (
    <main>
      <Nav version={version} />
      <InstallHero />
      <Stats />
      <Hero />
      <PlatformTabs />
      <Features />
      <CTA />
      <Footer />
    </main>
  )
}
