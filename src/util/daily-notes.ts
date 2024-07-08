import type { Moment } from "moment";
import { TFile, Vault, MetadataCache } from "obsidian";
import {
  createDailyNote,
  getAllDailyNotes,
  getDailyNote,
} from "obsidian-daily-notes-interface";

export async function createDailyNoteIfNeeded(moment: Moment): Promise<TFile> {
  let dailyNote = await getDailyNote(moment, getAllDailyNotes())
  if (!dailyNote) {
    dailyNote = await createDailyNote(moment)
  }

  let linkText = await MetadataCache.getFileCache(dailyNote).frontmatterLinks[0].link
  let timeText = 'calendar/' + moment.format('YYYY') + '/' + moment.format('MM') + '/' + moment.format('DD') + '/'
  return Vault.getFileByPath(timeText + linkText + '.md');
}
