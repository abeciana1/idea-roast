import PromptForm from '@/components/_form/PromptForm'
import Footer from '@/components/_general/Footer'

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <PromptForm />
      </main>
      <Footer />
    </>
  );
}
