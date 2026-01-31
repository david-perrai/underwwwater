<template>
  <BaseTemplate>
    <template #main>
      <CardTemplate>
        <template #card>
          <Suspense>
            <StrateStats></StrateStats>
          </Suspense>
        </template>
      </CardTemplate>
    </template>
  </BaseTemplate>
</template>
