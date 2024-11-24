<script setup lang="ts">
import { PageHeading } from "@/components/layout";
import { PageContentContainer } from "@/components/layout";
import AppButton from "@/components/ui/AppButton/AppButton.vue";
import AppIcon from "@/components/ui/AppIcon/AppIcon.vue";
import { ICON_NAMES } from "@/constants";
</script>

<template>
  <PageHeading>Customers</PageHeading>
  <PageContentContainer>
    <AppButton> <AppIcon :name="ICON_NAMES.Plus" /> Add Customer </AppButton>
  </PageContentContainer>
</template>

<style lang="scss" scoped></style>
