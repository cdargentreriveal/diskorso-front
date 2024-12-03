<script lang="ts" setup>
definePageMeta({
  layout: 'page',
})
</script>
<template>
  <div class="container mx-auto my-20 -md:px-5">
    <div class="flex items-center flex-wrap">
      <div class="about-content w-7/12 -md:w-full">
        <div class="w-9/12 mx-auto -md:w-full">
          <div class="about-title font-bold text-4xl uppercase -md:text-3xl">
            <h2>
              A propos de <br /><span class="font-normal purple-color"
                >Diskorso</span
              >
            </h2>
          </div>
          <div
            class="about-description mt-10 -md:w-full -md:text-sm md:text-sm xl:text-md 2xl:text-base"
          >
            <h3 class="text-2xl">Le concept</h3>

            <p class="pt-4">
              Diskorso est un site collaboratif qui facilite la création de
              dossiers thématiques. Il permet de créer de nouveaux articles
              aisément à partir d'extraits trouvés sur internet, et de les
              publier en un clic.
            </p>
            <p class="pt-4">
              En effet, sur de nombreux sujets, il est rarement nécessaire de
              rédiger un document de zéro&nbsp;: la plupart du temps, toutes les
              ressources sont déjà disponibles sur internet. Mais peut-être
              sont-elles difficilement accessibles, ou ne présentent-elles pas
              le sujet comme vous le souhaiteriez. Lors de votre parcours sur
              internet, vous pouvez alors extraire les citations que vous jugez
              les plus pertinentes pour construire à votre manière un document
              sur le sujet.
            </p>

            <p class="pt-4">
              La création et le partage de ces <i>promenades numériques</i> est
              d'une grande facilité sur Diskorso, grâce à une collecte
              centralisée d'extraits et à un outil intuitif de composition de
              promenades. Les promenades publiées sont alors directement
              accessibles à tous (la création d'un compte n'étant requise que
              pour les créateurs de promenades), et chaque extrait pointe
              automatiquement vers sa page d'origine.
            </p>

            <h3 class="text-2xl pt-10">Le nom</h3>

            <p class="pt-4">
              Le nom Diskorso vient de <i>disco</i>, «&nbsp;j'apprends&nbsp;» en
              latin, et de <i>korso</i>, «&nbsp;promenade&nbsp;» en espéranto.
              Il reflète l'esprit du site&nbsp;: créer des promenades sur des
              sujets variés pour partager nos connaissances.
            </p>

            <h3 class="text-2xl pt-10">L'utilisation</h3>

            <p class="pt-4">
              Lors de votre recherche sur internet, vous sélectionnez les
              extraits qui vous semblent pertinents et les stockez sur votre
              compte Diskorso. Cela peut se faire grâce à un copier-coller, mais
              nous conseillons notre extension pour Firefox ou Chrome qui
              facilite grandement la tâche (cf. ci-dessous).
            </p>

            <p class="pt-4">
              Lorsque votre base d'extraits est prête, vous pouvez les
              sélectionner pour les utiliser dans une promenade. La création
              d'une promenade se fait alors par simple ajout ou réorganisation
              d'extraits, de transitions (textes personnels) et d'images.
            </p>

            <h3 class="text-2xl pt-10">L'extension</h3>

            <p class="pt-4">
              Le copier-coller systématique, à la main, des extraits et de leur
              URL vers votre compte Diskorso peut s'avérer un peu fastidieux.
              Nous avons donc programmé une extension pour vous faciliter la
              tâche. Il s'agit d'un petit programme à ajouter à votre navigateur
              et qui vous permet d'envoyer vers votre compte une citation et
              l'URL associée, par simple sélection du texte sur la page.
            </p>

            <p class="pt-4">
              Cette extension est disponible pour Chrome
              <span class="purple-color"
                ><a
                  href="https://chromewebstore.google.com/detail/diskorso-web-clipper/ngkgdhkpeglonmjelahjeegejfjecbce?authuser=0&hl=fr"
                  >ici</a
                ></span
              >
              et pour Firefox (version 109 minimum)
              <span class="purple-color"
                ><a
                  href="https://addons.mozilla.org/fr/firefox/addon/diskorso-web-clipper/"
                  >là</a
                >.</span
              >
            </p>

            <p class="pt-4">Bonne promenade !</p>
            <Button
              text="voir les promenades"
              type="secondary"
              to="/promenades"
            />
          </div>
        </div>
      </div>
      <div class="about-card w-5/12 -md:w-full flex justify-center">
        <img
          src="@/assets/images/diskorso-line.svg"
          alt="exemple de promenade numérique"
        />
      </div>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped></style>
