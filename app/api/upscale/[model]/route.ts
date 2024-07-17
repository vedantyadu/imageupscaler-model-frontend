import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import { upscalebackend } from '../../utils/axios'


export async function POST(req: NextRequest, { params }: { params: { model: string } }) {
  try {
    const model = params.model
    const data = await req.formData()
    const res = await upscalebackend.post(`/upscale/${model}`, data, {responseType: 'arraybuffer'})
    const blob = new Blob([res.data])
    return new Response(blob, { headers: { 'content-type': 'image/png' } })
  }
  catch (err) {
    return NextResponse.json({message: 'Internal server error'})
  }
}
